const containerGaleriaVesta = document.querySelector('.container-galeria-vesta');

const fileExt = [
    '.png',
    '.jpeg',
    '.jpg',
    '.webp',
]

export async function galeriaVesta(idBtn) {

    // TRAER IMAGENES AL FRONTEND
    const id = idBtn;
    const url = `/galeriaVesta/${id}`;
    const res = await fetch(url);
    const files = await res.json();
    console.log(files);

    // ARRAY DE OBJETOS
    // ? link_user:     NOMBRE DE USUARIO
    // ? link_title:    NOMBRE DE IMAGEN
    // ? link_stored:   RUTA DEL FILE
    // ? link_poster:   RUTA DEL POSTER(FILE)


    // CONTENEDOR DE IMAGENES
    files.forEach(file => {
        if (file.link_stored.endsWith('.png') || file.link_stored.endsWith('.jpg') || file.link_stored.endsWith('.jpeg')) {
                const picContainer = document.createElement('div');
                picContainer.className = 'image-container-galery';
                picContainer.innerHTML = `
                        <img src="${file.link_stored}" class="imageGalery" loadind="lazy" alt="VestaImage">
                        <p>${file.link_title}</p>
                        <button class="btn-save-image">Guardar</button>
                        `;
                containerGaleriaVesta.appendChild(picContainer);
            } 
        });

    // // EVENTO CLICK ABRIR IMAGEN
    //     const imageClick = document.querySelectorAll('.imageGalery');
    //     imageClick.forEach(btn => {
    //         btn.addEventListener('click', (event) => {
    //             // console.log(event.target.src);
    //             // ? REDIRIGIR DEPENDIENDO DEL MIMETYPE
    //             window.location.href = `${event.target.src}`;
    //         });
    //     });
}
// galeriaVesta();