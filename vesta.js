// ! MODULO CENTRAL VESTA
import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import { rateLimit } from 'express-rate-limit'
import session from 'express-session';
import path from 'path';
import fs from 'fs';

// * IMPORTAR FUNCIONES EXTERNAS (EDITABLES)
import { onlyImagesVesta } from './vesta-modulos/onlyImages.js';
import { supabase } from './vesta-modulos/vestabase.js';


// * RATE LIMIT PARA RUTAS
// ! LIMITAR PETICIONES DEL USUARIO PARA SUBIR IMAGENES
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    //ipv6Subnet: 56,
    message: 'Tus Peticiones como Usuario se han Terminado, Intentalo mas Tarde' // ? EDITAR TEXTO
});

// * PUERTO Y EXPRESS
const port = process.env.PORT;
const app = express();

// * SESSION PARA USUARIOS
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
}));
 
// * USO DE CARPETAS Y URL's
const __dirname = import.meta.dirname;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'assets')));
// app.use(express.static(path.join(__dirname, 'public_Vesta')));
// app.use(express.static(path.join(__dirname, 'uploads')))

// * MULTER CONFIGURACION
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        let titleLabel = req.body.titleVesta || 'vesta34';
        return cb(null, titleLabel + ' - ' + file.originalname);
    }
});
const upload = multer({storage,
    fileFilter: (req, file, cb) => {
        if (onlyImagesVesta(file.mimetype) == 'okay') {
            return cb(null, true);
        }
        return cb(new Error('Archivo no Valido'), false)
    }
});

// * PAGINA PRINCIPAL (MAIN PAGE)
// TODO: AÑADIR PAGINA PRINCIPAL FRONTEND
app.get('/', (req, res) => {
    if (req.session.views) {
        req.session.views++;
    } else {
        req.session.views = 1;
    }
    res.send(`Views: ${req.session.views}`);
    //res.send('VESTA main page');
});

// * RUTA DEL FORMULARIO DE REGISTRO
// TODO: AÑADIR PAGINA DE FORMULARIO FRONTEND
app.get('/registroVesta', (req, res) => {

});

// * ENDPOINT PARA RECIBIR DATOS DEL LOGIN
// TODO: CREAR MIDDLEWARE CON:
// ? 1. RECIBIR DATOS DE USUARIO
// ? 2. VALIDAR LOS DATOS DEL USUARIO CON MIDDLEWARE
// ? 3. ENVIAR DATOS VALIDADOS A AUTH SUPABASE
app.post('/loginVesta', limiter, (req, res, next) => {
    res.send('Usuario Creado');
    console.log(req.body);
    next();
});

// * ENDPOINT JSON DE LAS IMAGENES SUBIDAS (PUBLICO)
// LECTURA DEL DIRECTORIO DE UPLOADS (IMAGENES)
// TODO: PAGINACION DE ARCHIVOS / RECUPERAR LINKS DE SUPABASE
app.get('/galeriaVesta', (req, res) => {
    let limiteImagenes = 25;
    fs.readdir('./uploads', (err, files) => {
        if (err) {
            return res.status(500).json({error: 'Algo salio mal Intenta de Nuevo'});
        }
    let newFiles = files.slice(0, limiteImagenes);
    res.json(newFiles);
    });
});

// * RUTA DEL FORMULARIO PARA SUBIR IMAGENES FRONTEND
app.get('/subirImagenVesta', (req, res) => {

});

// * ENDPOINT PARA RECIBIR FORMULARIO CON IMAGENES
// ! IMPORTANTE: SOLO RECIBIR IMAGENES, CREAR MIDDLEWARES PARA VALIDAR DATOS
// TODO: MIDDLEWARES DE VERIFICACION
// TODO: ENVIAR RUTAS DE ARCHIVOS A SUPABASE
app.post('/recibirImagenVesta', (req, res, next) => {

        
});

// * ENCENDIDO DEL SERVIDOR
app.listen(port, () => {
    console.log(`Servidor Vesta Escuchando en el Puerto: ${port}`);
});