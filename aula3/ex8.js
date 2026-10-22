const campo = document.querySelector("#texto");
const quantidade = document.querySelector("#quantidade");

campo.addEventListener("input", function () {
    quantidade.textContent = campo.value.length;
});
