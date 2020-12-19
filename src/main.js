import { generatePDFwith3Pages, generatePDFwith1Page, getNumberOfPages } from './pdfUtils.js';
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

function noDetectedException() {
    process.on('uncaughtException', (err, origin) => {
        console.error(err.message);
        console.error('Surgio un error inesperado :(');
    });
}

async function generatePDF(callback) {
    let counter = 0;
    console.log('original path: ' + originalPdfPath);
    // recorrer los pdf src
    for (let i = 0; i < originalPdfPath.length; i++) {
        try {
            let documentLength = await getNumberOfPages(originalPdfPath[i])
                // recorrer los nombres del json index.csv
            for (let j = 0; j < documentLength; j++) {
                if (names[counter].name === undefined) {
                    console.log('se acabaron los nombres del index.csv');
                } else {
                    let finalPath = `${standardFinalPath}/${names[counter].name}.pdf`;
                    console.log(`Archivo en ejecucion: ${originalPdfPath[i]}`);
                    console.log(`Enviado a: ${finalPath}`);
                    await callback(originalPdfPath[i], finalPath);
                    counter++;
                }
            }
        } catch (error) {
            console.error('se ha detectado un error, generatePDF()');
            console.error(error);
            console.error(error.message);
            console.error(error.code);
        }
    }
}


async function extract3pages() {
    console.time("proceso finalizado en");
    generateArrayOfOriginalPDF();
    await generatePDF(async function(a, b) {
        await generatePDFwith3Pages(a, b);
    }).catch(error => console.error(error));

    noDetectedException();

    console.timeEnd("proceso finalizado en");
}

async function extract1page() {
    console.time("proceso finalizado en");
    generateArrayOfOriginalPDF();
    await generatePDF(async function(a, b) {
        await generatePDFwith1Page(a, b);
    }).catch(error => console.error(error));

    noDetectedException();

    console.timeEnd("proceso finalizado en");
}

export { extract3pages, extract1page };