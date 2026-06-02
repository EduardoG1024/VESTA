import { rateLimit } from 'express-rate-limit';

// * RATE LIMIT PARA RUTAS
// * 5 PETICIONES => 15 MINUTOS
// ! LIMITAR PETICIONES DEL USUARIO PARA SUBIR IMAGENES
// app.set('trust proxy', 1);  // ? CLOUDFLARE TUNNEL CONFIGURAR
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    //ipv6Subnet: 56,
    message: 'Tus Peticiones como Usuario se han Terminado, Intentalo mas Tarde...' // ? EDITAR TEXTO
});