(function () {
  const pool = require("../bd");

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
      const { rg_civil, rg_militar, cpf, data_nascimento, matricula } =
        req.body;
      const [result] = await pool.query(
        "INSERT INTO policiais (rg_civil, rg_militar, cpf, data_nascimento, matricula) VALUES (?, ?, ?, ?, ?)",
        [rg_civil, rg_militar, cpf, data_nascimento, matricula]
      );
      res.json({ id: result.insertId, ...req.body });
    } catch (err) {
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
})();
