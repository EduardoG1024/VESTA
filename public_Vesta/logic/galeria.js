const containerGaleriaVesta = document.querySelector('.container-galeria-vesta');

async function galeriaVesta() {
    fetch('/galeriaVesta')
    .then(res => res.json())
    .then(res => {
        res.forEach(image => {
            const picture = document.createElement('img');
            picture.src = image;
            picture.style.width = '200px';
            containerGaleriaVesta.appendChild(picture);
        })
    })
    .catch(err => console.log(err))
}
galeriaVesta();