import {
    generatePDFwith3Pages,
    generatePDFwith2Pages,
    generatePDFwith1Page,
    getNumberOfPages
} from './pdfUtils.js';

import { newfileNames, pdfNames, path2, path3 } from './getFileNames.js';


const originalPdfPath = [];
const standardPath = path2;
const standardFinalPath = path3;
const names = newfileNames;
let counter = 0;

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

async function generatePDF(callback, options) {
    // recorrer los pdf src
    let rounds;
    let residual;
    for (let i = 0; i < originalPdfPath.length; i++) {
        try {
            let documentLength = await getNumberOfPages(originalPdfPath[i])
            switch (options) {
                case 1:
                    await pdf(documentLength, i, callback);
                    break;
                case 2:
                    rounds = documentLength / 2;
                    residual = documentLength % 2;
                    if (residual === 0) {
                        await pdf(rounds, i, callback);
                    } else {
                        console.log('este documento no se puede dividir');
                    }
                    break;
                case 3:
                    rounds = documentLength / 3;
                    residual = documentLength % 3;
                    if (residual === 0) {
                        await pdf(rounds, i, callback);
                    } else {
                        console.log('este documento no se puede dividir');
                    }
                    break;
            }
        } catch (error) {
            console.error('se ha detectado un error, generatePDF()');
            console.error('Por favor revisa el index.csv y el numero de paginas de tu documento');
            console.error(error.message);
        }
    }
}

// comunication with pdfUtils
async function pdf(rounds, i, callback) {
    for (let j = 0; j < rounds; j++) {
        let finalPath = `${standardFinalPath}/${names[counter].name}.pdf`;
        console.log(`Archivo en ejecucion: ${originalPdfPath[i]}`);
        console.log(`Enviado a: ${finalPath}`);
        await callback(originalPdfPath[i], finalPath)
            .catch(err => console.error(err.message));
        counter++;
    }
}


// comunication with bin pdf3pages and pdf1page
async function extract3pages() {
    console.time("proceso finalizado en");
    generateArrayOfOriginalPDF();
    await generatePDF(async function(a, b) {
        await generatePDFwith3Pages(a, b);
    }, 3).catch(error => console.error(error));

    noDetectedException();

    console.timeEnd("proceso finalizado en");
}

async function extract2pages() {
    console.time("proceso finalizado en");
    generateArrayOfOriginalPDF();
    await generatePDF(async function(a, b) {
        await generatePDFwith2Pages(a, b);
    }, 2).catch(error => console.error(error));

    noDetectedException();

    console.timeEnd("proceso finalizado en");
}

async function extract1page() {
    console.time("proceso finalizado en");
    generateArrayOfOriginalPDF();
    await generatePDF(async function(a, b) {
        await generatePDFwith1Page(a, b);
    }, 1).catch(error => console.error(error));

    noDetectedException();

    console.timeEnd("proceso finalizado en");
}

export { extract3pages, extract2pages, extract1page };