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
  console.log('archivo creado')
  await delete3Pages(pathExtract, 0, 1, 2);
  console.log('');
}

async function getNumberOfPages(pathExtract) {
  const originalDoc = readFileSync(pathExtract);
  let originalpdf = await PDFDocument.load(originalDoc);
  return originalpdf.getPageCount();
}

async function delete3Pages(pathExtract, a, b, c) {
  const originalDoc = readFileSync(pathExtract);
  let originalpdf = await PDFDocument.load(originalDoc);
  originalpdf.removePage(a);
  originalpdf.removePage(b);
  originalpdf.removePage(c);
  //console.log(await getNumberOfPages(pathExtract)); 
  writeFileSync(pathExtract, await originalpdf.save());
  console.log('paginas eliminadas, paginas restantes: ' + await getNumberOfPages(pathExtract)); 
}

// for (let index = 0; index < 10; index++) {
//   await delete3Pages('C:/Users/aleja/OneDrive/Documentos/pdfDirectory/src/El libro negro del programador - Rafael Gomez Blanes.pdf');
// }

export { generatePDFwith3Pages, getNumberOfPages, delete3Pages};
//generatePDFwith3Pages('C:/Users/aleja/OneDrive/Documentos/Libros/test.pdf', './src/test.pdf').catch(err => console.log(err));
