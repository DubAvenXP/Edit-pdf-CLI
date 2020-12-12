import {generatePDFwith3Pages, getNumberOfPages} from './pdfUtils.js';
import fileNames from './getFileNames.js';

const initialPath = 'C:/Users/aleja/OneDrive/Documentos/Libros/test.pdf';
const pages = await getNumberOfPages(initialPath);
//generatePDFwith3Pages('C:/Users/aleja/OneDrive/Documentos/Libros/test.pdf', './src/test1.pdf')
//.catch(err => console.log(err));

console.log(pages);

console.log(fileNames.length);
