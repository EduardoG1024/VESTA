import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import { rateLimit } from 'express-rate-limit'
import path from 'path';

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
app.use(express.static(path.join(__dirname, 'public_Vesta')));

// MULTER CONFIGURACION
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        let titleLabel = req.body.titleVesta;
        cb(null, titleLabel + ' - ' + file.originalname);
    }
});
const upload = multer({storage: storage});

// PAGINA PRINCIPAL (REGISTRO O INICIO DE SESION)
app.get('/', (req, res) => {
    res.send('principal vesta');
});

// PAGINA GALERIA (DISPLAY DE SUBIDOS)
app.get('/galeria', (req, res) => {
    res.send('galeria');
});

// PAGINA FORMULARIO (FORMULARIO DE SUBIR ARCHIVOS)
app.post('/formularioVesta', limiter, upload.single('imageVesta'), (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    res.status(202).send('Tu imagen se ha Guardado con Exito');
    next();
});

// ENCENDIDO DEL SERVIDOR
app.listen(port, () => {
    console.log(`Servidor Vesta Escuchando en el Puerto: ${port}`);
});