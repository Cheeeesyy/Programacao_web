const titulo = document.querySelector("#titulo");
const campoNome = document.querySelector("#nome");
const botaoAtualizar = document.querySelector("#atualizar");
const totalInteracoes = document.querySelector("#interacoes");
const botaoDescricao = document.querySelector("#alternar-descricao");
const descricao = document.querySelector("#descricao");
const botaoTema = document.querySelector("#alternar-tema");
let interacoes = 0;

botaoAtualizar.addEventListener("click", function () {
    const nome = campoNome.value.trim();

    if (nome !== "") {
        titulo.textContent = nome;
    }

    interacoes = interacoes + 1;
    totalInteracoes.textContent = interacoes;
});

botaoDescricao.addEventListener("click", function () {
    descricao.hidden = !descricao.hidden;
});

botaoTema.addEventListener("click", function () {
    document.body.classList.toggle("escuro");
});
