const express = require("express");
const produtosRoutes = require("./routes/produtosRoutes");
const app = express();
const porta = process.env.PORT || 3000;

app.use("/produtos", produtosRoutes);

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
