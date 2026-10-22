const express = require("express");
const produtosController = require("../controllers/produtosController");
const router = express.Router();

router.get("/", produtosController.listarProdutos);

// A rota fixa precisa vir antes de /:id.
router.get("/total", produtosController.totalProdutos);
router.get("/:id", produtosController.buscarProduto);

module.exports = router;
