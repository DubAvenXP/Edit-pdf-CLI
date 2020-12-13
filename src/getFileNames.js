import { userInfo  } from 'os';
import { readdirSync } from 'fs';
import pkg from 'csvtojson';
const { csv } = pkg;

const username = userInfo().username;
const csvFile = `C:/Users/${username}/OneDrive/Documentos/pdfDirectory/index.csv`;
const path1 = `C:/Users/${username}/OneDrive/Documentos/`;
const path2 = `C:/Users/${username}/OneDrive/Documentos/pdfDirectory/src`;
const path3 = `C:/Users/${username}/OneDrive/Documentos/pdfDirectory/result`
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
    }
    return response;
}

const pdfNames = getPdfSrc();
const newfileNames = await generateFileNames();

export { newfileNames, pdfNames, path2, path3 };

// const path = `C:/Users/${username}/Downloads/${filename}`;