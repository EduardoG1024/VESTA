// ! MODULO CENTRAL VESTA
import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import session from 'express-session';
import path from 'path';
import fs from 'fs';

// * IMPORTAR FUNCIONES EXTERNAS (EDITABLES)
import { onlyImagesVideosVesta } from './src/vesta-modulos/onlyImages.js';
import { supabase } from './src/vesta-modulos/vestabase.js';
import { limiter } from './src/vesta-modulos/vestaLimiter.js';
import { validateLoginVesta } from './src/vesta-middlewares/vesta-login.js';
import { generatePosterVesta } from './src/vesta-modulos/vesta-ffmpeg.js';


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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public_Vesta')));
app.use(express.static(path.join(__dirname, 'uploads')));

// * MULTER CONFIGURACION
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const VestaTitle = 'Vesta';
        const fileOriginalReplaced = file.originalname.replaceAll(' ', '-');
        return cb(null, VestaTitle + '-' + fileOriginalReplaced);
    }
});
const upload = multer({storage,
    fileFilter: (req, file, cb) => {
        if (onlyImagesVideosVesta(file.mimetype)) {
            return cb(null, true);
        }
        return cb(new Error({message: 'ERROR'}), false)
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
    // console.log(req.body);
    const { email: correo, password: contraseña } = req.body;
    if (!validateLoginVesta(correo, contraseña))
        return res.status(400).send('Datos no Validados');
    
    return res.status(200).send('Datos Validados ya Puedes Utilizar todas las Funciones de VESTA!');
});

// * ENDPOINT JSON DE LAS IMAGENES SUBIDAS (PUBLICO)
// LECTURA DEL DIRECTORIO DE UPLOADS (IMAGENES)
// TODO: PAGINACION DE ARCHIVOS / RECUPERAR LINKS DE SUPABASE
app.get('/galeriaVesta/:id', async (req, res) => {
    const page = parseInt(req.params.id) || 1; // PAGINA
    const limit = 12;             // LIMITE

    const from = (page - 1) * 10;
    const to = from + limit - 1;
    // console.log(nameImage);
    const { data, error } = await supabase
    .from('VESTA_DB_LINKS')
    .select('id, link_user, link_title, link_stored, link_date')
    // .gt('id', 31) 
    .order('id', {ascending: false})
    .range(from, to)

    res.json(data);
});

// * RUTA DEL FORMULARIO PARA SUBIR IMAGENES FRONTEND
app.get('/subirImagenVesta', (req, res) => {
    res.redirect('/formulario.html')
});

// * ENDPOINT PARA RECIBIR FORMULARIO CON IMAGENES
// ! IMPORTANTE: SOLO RECIBIR IMAGENES, CREAR MIDDLEWARES PARA VALIDAR DATOS
// TODO: MIDDLEWARES DE VERIFICACION
// TODO: ENVIAR RUTAS DE ARCHIVOS A SUPABASE
app.post('/recibirImagenVesta', limiter, upload.single('VestaImage'), async (req, res, next) => {
    
    // ? DEFINIR DATOS
    const usuario = req.body.VestaUsuario;
    const titulo = req.body.VestaTitle;
    const ruta = req.file.filename;
    const fecha = new Date().toISOString().split('T')[0];

    if (!usuario || !titulo || !req.file) return res.send('Debes Llenar Todos los Campos Solicitados');

    // ? POSTER
    if (req.file.mimetype == 'video/mp4') {
        const videoPath = `./uploads/${ruta}`;
        console.log(videoPath);
        generatePosterVesta(videoPath, ruta);
    }

    // ? DATABASE
    const { error } = await supabase
    .from('VESTA_DB_LINKS')
    .insert({
        link_user: usuario,
        link_title: titulo,
        link_stored: ruta,
        link_date: fecha,
    });
    if (error) return res.status(500).send('Lo Sentimos, No se Pudo Guardar tu Imagen, Intentalo de Nuevo');
    const urlImagen = `http://vesta.site/${ruta}`;
    res.status(200).send(`Tu Imagen ha Sido Guardada, Visita: ${urlImagen}`);
    next();
});

// ? ENDPOINT TEST
app.get('/test', async (req, res) => {
    const { data, error } = await supabase
    .from('VESTA_DB_LINKS')
    .select()
    .eq('id', 5)
    if(data[0].link_poster === null) return res.send('poster es null');
    res.json(data);
});

// * ENCENDIDO DEL SERVIDOR
app.listen(port, () => {
    console.log(`Servidor Vesta Escuchando en el Puerto: ${port}`);
    console.log(`http://localhost:${port}/formulario.html`);
});