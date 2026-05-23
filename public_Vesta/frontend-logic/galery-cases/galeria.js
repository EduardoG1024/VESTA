const containerGaleriaVesta = document.querySelector('.container-galeria-vesta');

const fileExt = [
    '.png',
    '.jpeg',
    '.jpg',
    '.webp',
]

async function galeriaVesta() {

    // TRAER IMAGENES AL FRONTEND
    const id = 1;
    const url = `/galeriaVesta/${id}`;
    const res = await fetch(url);
    const images = await res.json();
    console.log(images); // ARRAY DE OBJETOS
    
    // CONTENEDOR DE IMAGENES
    images.forEach(img => {
        if (img.link_stored.endsWith('.png') || img.link_stored.endsWith('.jpg') || img.link_stored.endsWith('.jpeg') || img.link_stored.endsWith('.webp')) {
                const picContainer = document.createElement('div');
                picContainer.className = 'image-container-galery';
                picContainer.innerHTML = `
                        <img src="${img.link_stored}" class="imageGalery" loadind="lazy" alt="VestaImage">
                        <button class="btn-save-image">Guardar</button>
                        `;
                containerGaleriaVesta.appendChild(picContainer);
            } else {
                const picContainer = document.createElement('div');
                picContainer.className = 'image-container-galery';
                picContainer.innerHTML = `
                        <video src="${img.link_stored}" class="imageGalery" preload="metadata" loading="lazy"></video>
                        <button class="btn-save-image">Guardar</button>
                        `;
                containerGaleriaVesta.appendChild(picContainer);
            }
        });

    // EVENTO CLICK ABRIR IMAGEN
        const imageClick = document.querySelectorAll('.imageGalery');
        imageClick.forEach(btn => {
            btn.addEventListener('click', (event) => {
                // console.log(event.target.src);
                window.location.href = `${event.target.src}`;
            });
        });
}
galeriaVesta();