const express = require("express");
const cors = require("cors");
const app = express();
const porta = process.env.PORT || 3000;
const produtos = [];
let proximoId = 1;

// Exercício 3: registrar cada requisição antes de processá-la.
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use(cors());
app.use(express.json());

// Exercício 2: validar os dados no cadastro e na atualização.
function validarProduto(req, res, next) {
    const { nome, preco } = req.body || {};

    if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({
            sucesso: false,
            erro: "O nome do produto é obrigatório."
        });
    }

    if (typeof preco !== "number" || !Number.isFinite(preco) || preco <= 0) {
        return res.status(400).json({
            sucesso: false,
            erro: "O preço deve ser um número maior que zero."
        });
    }

    next();
}

// Exercício 5: impedir IDs inválidos antes da consulta.
function validarId(req, res, next) {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
        return res.status(400).json({
            sucesso: false,
            erro: "O ID deve ser um número inteiro positivo."
        });
    }

    req.idProduto = id;
    next();
}

// Exercício 1: cadastrar produto.
app.post("/produtos", validarProduto, (req, res) => {
    const produto = {
        id: proximoId,
        nome: req.body.nome.trim(),
        preco: req.body.preco
    };

    proximoId = proximoId + 1;
    produtos.push(produto);

    res.status(201).json({ sucesso: true, dados: produto });
});

// Listar todos os produtos.
app.get("/produtos", (req, res) => {
    res.json({ sucesso: true, dados: produtos });
});

// Buscar um produto pelo ID.
app.get("/produtos/:id", validarId, (req, res) => {
    const produto = produtos.find(produto => produto.id === req.idProduto);

    if (!produto) {
        return res.status(404).json({
            sucesso: false,
            erro: "Produto não encontrado."
        });
    }

    res.json({ sucesso: true, dados: produto });
});

// Atualizar nome e preço do produto.
app.put("/produtos/:id", validarId, validarProduto, (req, res) => {
    const produto = produtos.find(produto => produto.id === req.idProduto);

    if (!produto) {
        return res.status(404).json({
            sucesso: false,
            erro: "Produto não encontrado."
        });
    }

    produto.nome = req.body.nome.trim();
    produto.preco = req.body.preco;

    res.json({ sucesso: true, dados: produto });
});

// Remover um produto.
app.delete("/produtos/:id", validarId, (req, res) => {
    const indice = produtos.findIndex(produto => produto.id === req.idProduto);

    if (indice === -1) {
        return res.status(404).json({
            sucesso: false,
            erro: "Produto não encontrado."
        });
    }

    const produto = produtos[indice];
    produtos.splice(indice, 1);

    res.json({ sucesso: true, dados: produto });
});

// Exercício 4: manter o padrão também nos erros.
app.use((req, res) => {
    res.status(404).json({ sucesso: false, erro: "Rota não encontrada." });
});

app.use((erro, req, res, next) => {
    const status = erro.status || 500;
    const mensagem = status === 400
        ? "JSON inválido."
        : "Não foi possível processar a requisição.";

    res.status(status).json({ sucesso: false, erro: mensagem });
});

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
