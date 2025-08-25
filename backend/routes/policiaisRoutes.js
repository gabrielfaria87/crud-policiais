const express = require("express");
const router = express.Router();
const controller = require("../controller/policiaisController");

router.get("/", controller.listar);
router.post("/", controller.cadastrar);
router.get("/cpf", controller.filtrarPorCPF);
router.get("/rg", controller.filtrarPorRG);

module.exports = router;
