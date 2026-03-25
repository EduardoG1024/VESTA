import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import { rateLimit } from 'express-rate-limit'
import session from 'express-session';
import path from 'path';
import fs from 'fs';

// IMPORTAR FUNCIONES
import { onlyImagesVesta } from './onlyImages.js';
import { error } from 'console';

// RATE LIMIT EXPRESS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
    message: 'Ya no puedes subir mas Archivos PAPU espera 15 minutos'
});

// PUERTO Y EXPRESS
const port = process.env.PORT;
const app = express();
 
// USO DE CARPETAS Y URL's
const __dirname = import.meta.dirname;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public_Vesta')));
app.use(express.static(path.join(__dirname, 'uploads')))

// MULTER CONFIGURACION
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

// PAGINA PRINCIPAL (REGISTRO O INICIO DE SESION)
app.get('/', (req, res) => {
    res.send('principal vesta');
});

// PAGINA GALERIA (DISPLAY DE SUBIDOS EN JSON)
// LECTURA DEL DIRECTORIO DE UPLOADS (IMAGENES)
// PAGINACION DE ARCHIVOS
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

// ENDPOINT PARA RECIBIR FORMULARIO (SOLO IMAGENES)
app.post('/formularioVesta', limiter, (req, res) => {upload.single('imageVesta')(req, res, (err) => {

        if (err) {
            console.error(err);

            if (err.message === 'INVALID_FILE_TYPE') {
                return res.status(400).json({
                    error: 'Solo se permiten imágenes'
                });
            }

            return res.status(500).json({
                error: 'Error al subir el archivo'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                error: 'No se subió ningún archivo'
            });
        }

        return res.status(201).json({
            message: 'Imagen subida correctamente',
            file: req.file.filename
        });
    });
});

// ENCENDIDO DEL SERVIDOR
app.listen(port, () => {
    console.log(`Servidor Vesta Escuchando en el Puerto: ${port}`);
});