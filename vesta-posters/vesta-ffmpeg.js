import ffmpeg from 'fluent-ffmpeg';
import installer from '@ffmpeg-installer/ffmpeg';
import path from 'path';
import fs from 'fs';

const __dirname = import.meta.dirname;
const postersPath = '../posters';

const testName = 'Vesta-BBC Hace que un Conejito De Nieve Comience a Derretirse(1080P).mp4';
const testPath = '../uploads/Vesta-BBC Hace que un Conejito De Nieve Comience a Derretirse(1080P).mp4'

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
            folder: path.join(__dirname, postersPath)
        })
        .on('end', () => {
            // console.log(`El Video Tiene su Poster: ${fileNamePoster}`);
        })
        .on('error', (err) => {
            // console.error(`Ocurrió un Error con: ${videoPath}, `, err);
        });
}
// generatePosterVesta(testPath)
// const files = fs.readdirSync('../uploads')
// // console.log(files);
// const videos = [];
// const postersPath = '../posters';

// files.forEach(file => {
//     if (file.endsWith('.mp4')) {
//         const pathFile = `../uploads/${file}`;
//         videos.push(pathFile);

//         const fileNamePoster = `Poster-${file}.webp`

//         ffmpeg(pathFile)
//             .screenshots({
//                 timestamps: [10],
//                 filename: fileNamePoster,
//                 folder: path.join(__dirname, postersPath)
//             })
//             .on('end', () => {
//                 console.log(`File ${file} guardo su frame`);
//             })
//             .on('error', (err) => {
//                 console.error('Error:', err);
//             });

//     }
// });
// console.log(videos);