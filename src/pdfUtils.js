import { readFileSync, writeFileSync, readFile, read } from 'fs';
import { PDFDocument } from 'pdf-lib';


async function generatePDFwith3Pages(pathExtract, pathSave) {
  // crear un nuevo documento
  const newDocument = await PDFDocument.create();
  // leer el documento original
  const originalDoc = readFileSync(pathExtract);

  // convertir el documento original a un PDF util
  let originalpdf = await PDFDocument.load(originalDoc);

  const copiedPages = await newDocument.copyPages(originalpdf, [0, 1, 2]);
  const [a, b, c] = copiedPages;
  
  newDocument.insertPage(0, a);
  newDocument.insertPage(1, b);
  newDocument.insertPage(2, c);
  

  writeFileSync(pathSave, await newDocument.save());
  console.log('archivo creado')
  await delete3Pages(pathExtract);
  console.log('');
}

async function getNumberOfPages(pathExtract) {
  const originalDoc = readFileSync(pathExtract);
  let originalpdf = await PDFDocument.load(originalDoc);
  return originalpdf.getPageCount();
}

async function delete3Pages(pathExtract) {
  let originalpdf = await PDFDocument.load(readFileSync(pathExtract));
  originalpdf.removePage(2);
  originalpdf.removePage(1);
  originalpdf.removePage(0);
  //console.log(await getNumberOfPages(pathExtract)); 
  writeFileSync(pathExtract, await originalpdf.save());
  console.log('paginas eliminadas, paginas restantes: ' + await getNumberOfPages(pathExtract)); 
}

// for (let index = 0; index < 10; index++) {
//   await delete3Pages('C:/Users/aleja/OneDrive/Documentos/pdfDirectory/src/El libro negro del programador - Rafael Gomez Blanes.pdf');
// }

export { generatePDFwith3Pages, getNumberOfPages, delete3Pages};
//generatePDFwith3Pages('C:/Users/aleja/OneDrive/Documentos/Libros/test.pdf', './src/test.pdf').catch(err => console.log(err));