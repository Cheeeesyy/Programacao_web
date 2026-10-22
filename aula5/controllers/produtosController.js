const produtos = [
    { id: 1, nome: "Teclado" },
    { id: 2, nome: "Mouse" },
    { id: 3, nome: "Monitor" }
];

function listarProdutos(req, res) {
    res.json({ mensagem: "Sucesso", dados: produtos });
}

function buscarProduto(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: "ID deve ser um número inteiro positivo."
        });
    }

    const produto = produtos.find(produto => produto.id === id);

    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado." });
    }

    res.json(produto);
}

function totalProdutos(req, res) {
    res.json({ total: produtos.length });
}

module.exports = {
    listarProdutos,
    buscarProduto,
    totalProdutos
};
