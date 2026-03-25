const containerGaleriaVesta = document.querySelector('.container-galeria-vesta');

async function galeriaVesta() {
    fetch('/galeriaVesta')
    .then(res => res.json())
    .then(res => {
        let newRes = res.slice(0, 15);
        newRes.forEach(image => {
            // CONTENEDOR DE IMAGENES
            const picture = document.createElement('img');
            picture.src = image;
            picture.className = 'imageGalery';
            containerGaleriaVesta.appendChild(picture);
        })
    })
    .catch(err => console.log(err))
}
galeriaVesta();