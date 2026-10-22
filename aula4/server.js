const express = require("express");
const app = express();
const porta = process.env.PORT || 3000;

// Exercício 1: rotas básicas.
app.get("/", (req, res) => {
    res.send("Bem-vindo ao sistema da aula 4!");
});

app.get("/sobre", (req, res) => {
    res.send("Sistema de exercícios de rotas e respostas com Express.");
});

app.get("/contato", (req, res) => {
    res.send("Contato: contato@example.com (endereço fictício para o exercício).");
});

// Exercício 2: resposta em JSON.
app.get("/api/produto", (req, res) => {
    res.json({ nome: "Teclado", preco: 120 });
});

// Exercício 3: parâmetro de rota.
app.get("/produto/:id", (req, res) => {
    const id = req.params.id;
    res.json({ id: id, mensagem: "ID do produto recebido." });
});

// Exercício 4: parâmetro na query string.
app.get("/busca", (req, res) => {
    const nome = req.query.nome || "";
    res.json({ nome: nome });
});

// Exercício 5: lista de alunos.
app.get("/api/alunos", (req, res) => {
    const alunos = [
        { id: 1, nome: "Gabriel" },
        { id: 2, nome: "Ana" },
        { id: 3, nome: "Carlos" }
    ];

    res.json(alunos);
});

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
