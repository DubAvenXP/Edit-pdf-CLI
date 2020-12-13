import { getResultPDF, path3, pdfNames, path2 } from './getFileNames.js';
import { unlink } from 'fs';

const resultData = getResultPDF();
const srcData = pdfNames;

function clearDirectory(data, path) {
    data.forEach(element => {
        unlink(`${path}/${element}`, (err) => {
            if (err) {
                console.error(err.message);
                console.error(err.code);
            } else {
                console.log('El siguiente elemento ha sido eliminado con exito: ' + element);
            }
        });
    });
}

clearDirectory(resultData, path3);
clearDirectory(srcData, path2);
