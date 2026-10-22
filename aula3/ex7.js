const campo = document.querySelector("#nome");
const saida = document.querySelector("#saida");

campo.addEventListener("input", function () {
    saida.textContent = campo.value;
});
