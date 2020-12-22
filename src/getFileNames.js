import { userInfo } from 'os';
import { readdirSync } from 'fs';
import pkg from 'csvtojson';
const { csv } = pkg;

const username = userInfo().username;

// Work PC
const csvFile = `C:/Users/${username}.GLOBAL-BUSINESS/Documents/pdfDirectory/index.csv`;
const path1 = `C:/Users/${username}.GLOBAL-BUSINESS/Documents/`;
const path2 = `C:/Users/${username}.GLOBAL-BUSINESS/Documents/pdfDirectory/src`;
const path3 = `C:/Users/${username}.GLOBAL-BUSINESS/Documents/pdfDirectory/result`;

// Jony
// const csvFile = `C:/Users/${username}/Documents/pdfDirectory/index.csv`;
// const path1 = `C:/Users/${username}/Documents/`;
// const path2 = `C:/Users/${username}/Documents/pdfDirectory/src`;
// const path3 = `C:/Users/${username}/Documents/pdfDirectory/result`;


// Laptop
// const csvFile = `C:/Users/${username}/OneDrive/Documentos/pdfDirectory/index.csv`;
// const path1 = `C:/Users/${username}/OneDrive/Documentos/`;
// const path2 = `C:/Users/${username}/OneDrive/Documentos/pdfDirectory/src`;
// const path3 = `C:/Users/${username}/OneDrive/Documentos/pdfDirectory/result`;

async function generateFileNames() {
    return await csv().fromFile(csvFile);;
}

function getPdfFiles(path) {
    return readdirSync(path);
}

function getPdfSrc() {
    let response = 'null';
    const documentsDirectory = getPdfFiles(path1);
    if (documentsDirectory.includes('pdfDirectory')) {
        const srcDirectory = getPdfFiles(path2)
        response = srcDirectory;
    } else {
        console.log('No sea ha detectado el pdfDirectory...');
        // si no se detecta el pdfDirectory seria bueno crear el DIR
    }
    return response;
}

function getResultPDF() {
    return readdirSync(path3);
}

const pdfNames = getPdfSrc();
const newfileNames = await generateFileNames();





export { newfileNames, pdfNames, path2, path3, getResultPDF };

// const path = `C:/Users/${username}/Downloads/${filename}`;