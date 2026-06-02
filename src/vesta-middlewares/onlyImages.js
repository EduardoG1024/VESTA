// FUNCION PARA SOLO ACEPTAR IMAGENES
// FUNCION PARA ENDPOINT DEL FORMULARIO

export function onlyImagesVideosVesta(mimetype, cb) {
    const allowedTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp',
        'video/mp4'
    ];

    return allowedTypes.includes(mimetype);
};