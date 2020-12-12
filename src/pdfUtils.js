import { readFileSync, writeFileSync } from 'fs';
import { PDFDocument } from 'pdf-lib';


async function generatePDFwith3Pages(pathExtract, pathSave) {
  const newDocument = await PDFDocument.create();
  const originalDoc = readFileSync(pathExtract);

  let originalpdf = await PDFDocument.load(originalDoc);
  const copiedPages = await newDocument.copyPages(originalpdf, [0, 1, 2]);
  const [firstPage, secondPage, thirdPage] = copiedPages;

  newDocument.insertPage(0, firstPage);
  newDocument.insertPage(1, secondPage);
  newDocument.insertPage(2, thirdPage);
  
  writeFileSync(pathSave, await newDocument.save());
  console.log('documento creado con exito...');
}

async function getNumberOfPages(pathExtract) {
  const originalDoc = readFileSync(pathExtract);
  let originalpdf = await PDFDocument.load(originalDoc);
  return originalpdf.getPageCount();
}

export { generatePDFwith3Pages, getNumberOfPages};
//generatePDFwith3Pages('C:/Users/aleja/OneDrive/Documentos/Libros/test.pdf', './src/test.pdf').catch(err => console.log(err));
