let contador = 0;
const valor = document.querySelector("#valor");
const botao = document.querySelector("#botao");

botao.addEventListener("click", function () {
    contador = contador + 1;
    valor.textContent = contador;
});
