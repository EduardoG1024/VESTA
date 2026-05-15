const containerGaleriaVesta = document.querySelector('.container-galeria-vesta');

async function galeriaVesta() {
    const name = 'blonde-blazer-dispatch-4k-wallpaper-uhdpaper.com-915@5@j.jpg';
    const url = `/galeriaVesta/${name}`;
    const res = await fetch(url);
    const image = await res.json();
    console.log(image);
    
    // CONTENEDOR DE IMAGENES
    const picture = document.createElement('img');
    picture.src = image;
    picture.className = 'imageGalery';
    containerGaleriaVesta.appendChild(picture);
}
galeriaVesta();