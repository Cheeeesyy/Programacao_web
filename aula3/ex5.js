const botao = document.querySelector("#botao");
const mensagem = document.querySelector("#mensagem");

botao.addEventListener("click", function () {
    mensagem.hidden = !mensagem.hidden;
});
