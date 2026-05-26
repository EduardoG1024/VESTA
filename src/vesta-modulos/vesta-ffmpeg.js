import ffmpeg from 'fluent-ffmpeg';
import installer from '@ffmpeg-installer/ffmpeg';
import path from 'path';
import fs from 'fs';

const __dirname = import.meta.dirname;
const postersPath = path.join(__dirname, '..', '..', 'posters');

// * SOLO RECIBIR MIMETYPE DE .MP4
// ? videoPath DEBE DE SER => "../uploads/${Nombre-del-Video.mp4}"
export const generatePosterVesta = (videoPath, ruta) => {

    // ? EDITABLE
    const NewtestName = ruta.replace('.mp4', '.webp')
    const fileNamePoster = `Poster-${NewtestName}`;

    ffmpeg(videoPath)
        .screenshots({
            timestamps: [10],
            filename: fileNamePoster,
            folder: postersPath
        })
        .on('end', () => {
            // console.log(`El Video Tiene su Poster: ${fileNamePoster}`);
        })
        .on('error', (err) => {
            // console.error(`Ocurrió un Error con: ${videoPath}, `, err);
        });
        
        // ? RETURN DE LA RUTA DEL POSTER
        return fileNamePoster;
}