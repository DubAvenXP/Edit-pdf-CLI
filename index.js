import {generatePDFwith3Pages} from './src/pdfUtils.js';
import { newfileNames, pdfNames, path2, path3 } from './src/getFileNames.js';


const originalPdfPath = [];
const standardPath = path2;
const standardFinalPath = path3;
const names = newfileNames;

function generateArrayOfOriginalPDF() {
    for (let i = 0; i < pdfNames.length; i++) {
        originalPdfPath[i] = `${standardPath}/${pdfNames[i]}` 
    }
}

async function generatePDF() {
    for (let i = 0; i < originalPdfPath.length; i++) {
        try {
            for (let j = 0; j < names.length; j++) {
                let finalPath = `${standardFinalPath}/${names[j].name}.pdf`;
                console.log('send: ' + finalPath);
                await generatePDFwith3Pages(originalPdfPath[i], finalPath);
            }
        } catch (error) {
            console.error(error.message);
            console.error(error);
        }    
    }
}

console.time("proceso finalizado en");
generateArrayOfOriginalPDF();
//console.log(names);
await generatePDF().catch(error => console.log(error));
process.on('uncaughtException', (err, origin) => {
    console.error(err.message);
    console.error('Surgio un error inesperado :(');
    console.error(err);
})
console.timeEnd("proceso finalizado en");