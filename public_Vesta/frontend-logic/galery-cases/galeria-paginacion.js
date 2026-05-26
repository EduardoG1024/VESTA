import { galeriaVesta } from "./galeria.js";

const previous = document.getElementById('regresarBtn');
const next = document.getElementById('siguienteBtn');
const pageView = document.getElementById('paginaView');

let pageNext = 0;
// PAGINACION SIGUIENTE
next.addEventListener('click', () => {
    pageNext++;
    console.log(pageNext);
    pageView.innerHTML = pageNext;

    galeriaVesta(pageNext)
});
// PAGINACION ANTERIOR
previous.addEventListener('click', () => {
    if (pageNext <= 0) return;
    pageNext--;
    console.log(pageNext);
    pageView.innerHTML = pageNext;

    galeriaVesta(pageNext);
});
