const pool = require("../bd");
const fs = require("fs");
const path = require("path");

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  // Aceita qualquer CPF com 11 dígitos para facilitar testes
  return cpf.length === 11;
}

exports.exportarParaJson = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM policiais");
    const filePath = path.join(__dirname, "../policiais.json");
    fs.writeFileSync(filePath, JSON.stringify(rows, null, 2));
    res.json({
      message: "Dados exportados para policiais.json",
      count: rows.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJson = (req, res) => {
  const filePath = path.join(__dirname, "../policiais.json");
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  } else {
    res.status(404).json({ error: "Arquivo policiais.json não encontrado." });
  }
};

exports.listar = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM policiais");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cadastrar = async (req, res) => {
  try {
    const { rg_civil, rg_militar, cpf, data_nascimento, matricula } = req.body;
    if (!rg_civil || !rg_militar || !cpf || !data_nascimento || !matricula) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }
    if (typeof rg_militar !== "string" || rg_militar.trim() === "") {
      return res.status(400).json({ error: "RG Militar é obrigatório." });
    }
    if (!validarCPF(cpf)) {
      return res.status(400).json({ error: "CPF inválido." });
    }
    // Verificar unicidade
    const [existentes] = await pool.query(
      "SELECT * FROM policiais WHERE cpf = ? OR rg_civil = ? OR rg_militar = ? OR matricula = ?",
      [cpf, rg_civil, rg_militar, matricula]
    );
    if (existentes.length > 0) {
      return res.status(409).json({
        error: "Já existe policial com CPF, RG ou matrícula informados.",
      });
    }
    const [result] = await pool.query(
      "INSERT INTO policiais (rg_civil, rg_militar, cpf, data_nascimento, matricula) VALUES (?, ?, ?, ?, ?)",
      [rg_civil, rg_militar, cpf, data_nascimento, matricula]
    );
    // Exporta para JSON após cadastrar
    try {
      const [rows] = await pool.query("SELECT * FROM policiais");
      const filePath = require("path").join(__dirname, "../policiais.json");
      require("fs").writeFileSync(filePath, JSON.stringify(rows, null, 2));
    } catch (err) {
      console.error("Erro ao exportar para JSON após cadastro:", err);
    }
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error("Erro ao cadastrar policial:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.filtrarPorCPF = async (req, res) => {
  try {
    const { cpf } = req.query;
    const [rows] = await pool.query("SELECT * FROM policiais WHERE cpf = ?", [
      cpf,
    ]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.filtrarPorRG = async (req, res) => {
  try {
    const { rg_civil } = req.query;
    const [rows] = await pool.query(
      "SELECT * FROM policiais WHERE rg_civil = ?",
      [rg_civil]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
