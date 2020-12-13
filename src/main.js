import {generatePDFwith3Pages} from './pdfUtils.js';
import { newfileNames, pdfNames, path2, path3 } from './getFileNames.js';


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
    let counter = 0;
    for (let i = 0; i < originalPdfPath.length; i++) {
        try {
            for (let j = 0; j < names.length; j++) {
                if (i > 0) {
                    if (counter >= names.length) {
                    } else {
                        let finalPath = `${standardFinalPath}/${names[counter].name}.pdf`;
                        console.log('send: ' + finalPath);
                        await generatePDFwith3Pages(originalPdfPath[i], finalPath);
                        counter++;
                    }
                } else {
                    let finalPath = `${standardFinalPath}/${names[j].name}.pdf`;
                    console.log('send: ' + finalPath);
                    await generatePDFwith3Pages(originalPdfPath[i], finalPath);
                    counter = j + 1;
                }
            }
        } catch (error) {
            console.error(error.message);
            console.error(error.code);
            console.error('soy un error');
        }    
    }
}
async function main() {
    console.time("proceso finalizado en");
    generateArrayOfOriginalPDF();
    //console.log(names);
    await generatePDF().catch(error => console.log(error));
    process.on('uncaughtException', (err, origin) => {
        console.error(err.message);
        console.error('Surgio un error inesperado :(');
    })
    console.timeEnd("proceso finalizado en");
}

export { main };