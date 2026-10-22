const titulo = document.querySelector("#titulo");
const botao = document.querySelector("#botao");

botao.addEventListener("click", function () {
    titulo.textContent = "JavaScript é interativo!";
});
