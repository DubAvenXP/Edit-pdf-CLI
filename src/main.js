import { generatePDFwith3Pages, generatePDFwith1Page } from './pdfUtils.js';
import { newfileNames, pdfNames, path2, path3 } from './getFileNames.js';


const originalPdfPath = [];
const standardPath = path2;
const standardFinalPath = path3;
const names = newfileNames;

(function generateArrayOfOriginalPDF() {
    for (let i = 0; i < pdfNames.length; i++) {
        originalPdfPath[i] = `${standardPath}/${pdfNames[i]}`
    }
})();

function noDetectedException() {
    process.on('uncaughtException', (err, origin) => {
        console.error(err.message);
        console.error('Surgio un error inesperado :(');
    });
}

async function generatePDF(callback) {
    let counter = 0;
    for (let i = 0; i < originalPdfPath.length; i++) {
        try {
            for (let j = 0; j < names.length; j++) {
                if (i > 0) {
                    if (counter >= names.length) {} else {
                        let finalPath = `${standardFinalPath}/${names[counter].name}.pdf`;
                        console.log(`Archivo en ejecucion: ${originalPdfPath[i]}`);
                        console.log(`Enviado a: ${finalPath}`);
                        await callback(originalPdfPath[i], finalPath);
                        counter++;
                    }
                } else {
                    let finalPath = `${standardFinalPath}/${names[j].name}.pdf`;
                    console.log(`Archivo en ejecucion: ${originalPdfPath[i]}`);
                    console.log(`Send: ${finalPath}`);
                    await callback(originalPdfPath[i], finalPath);
                    counter = j + 1;
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
    await generatePDF(async function(a, b) {
        await generatePDFwith3Pages(a, b);
    }).catch(error => console.error(error));

    noDetectedException();

    console.timeEnd("proceso finalizado en");
}

async function extract1page() {
    console.time("proceso finalizado en");

    await generatePDF(async function(a, b) {
        await generatePDFwith1Page(a, b);
    }).catch(error => console.error(error));

    noDetectedException();

    console.timeEnd("proceso finalizado en");
}

export { extract3pages, extract1page };