// FUNCION PARA SOLO ACEPTAR IMAGENES
// FUNCION PARA ENDPOINT DEL FORMULARIO

export function onlyImagesVesta(extencion) {
    if ( extencion == 'image/png' || extencion == 'image/jpeg' || extencion == 'image/jpg' || extencion == 'images/webp') {
        return 'okay';
    } else {
        return 'no';
    }
};