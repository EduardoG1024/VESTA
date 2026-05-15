const containerGaleriaVesta = document.querySelector('.container-galeria-vesta');

async function galeriaVesta() {

    // TRAER IMAGENES AL FRONTEND
    const id = 1;
    const url = `/galeriaVesta/${id}`;
    const res = await fetch(url);
    const images = await res.json();
    // console.log(images); // ARRAY DE OBJETOS
    
    // CONTENEDOR DE IMAGENES
    images.forEach(img => {
        const picContainer = document.createElement('div');
        picContainer.className = 'image-container-galery';
        picContainer.innerHTML = `
                <img src="${img.link_stored}" class="imageGalery" loadind="lazy" alt="VestaImage">
                <button class="btn-save-image">Guardar</button>
                `;
        containerGaleriaVesta.appendChild(picContainer);

        
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