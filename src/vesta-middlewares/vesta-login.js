// * RUTA "/loginVesta"
// ? VALIDAR DATOS RECIBIDOS DEL USUARIO

const LengthLimit = 150;

export function validateLoginVesta(correo, contraseña) {
    console.log('_________________________________')
    console.log(correo, contraseña);
    // * CORREO
    const emailLength = correo.length <= LengthLimit; // ? REGRESAR BOOLEAN
    const emailEmail = correo.includes('@');          // ? REGRESAR BOOLEAN
    // * CONTRASEÑA
    const password = contraseña.includes(' ');        // ? REGRESAR BOOLEAN
    // console.log(`Tu contraseña: ${contraseña} contiene espacios`);

    // console.log(emailEmail, emailLength);

    if (!emailEmail || !emailLength ) 
        return console.log('Correo no Valido');
    console.log('Correo Valido');
    if (password) return console.log('Contraseña no Valida, Evita poner Espacios');
    console.log('Contraseña Valida');

    return true;
}