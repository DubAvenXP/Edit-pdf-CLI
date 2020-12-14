#!/usr/bin/env node
console.log('Instrucciones para correr el script');
console.group('Pasos');
    console.log('1. Asegurate de tener una carpeta con el nombre "pdfDir" en la ruta OneDrive/Documentos');
    console.log('2. Dentro de pdfDir deben existir lo siguiente...');
    console.group('Archivos')
        console.log('a. La carpeta src que posee los PDF para extraer informacion.');
        console.log('b. La carpeta result que tendra todos los PDF resultantes de la extraccion.');
        console.log('c. El archivo csv index.csv que debe tener los nombre con los que se quiere nombrar');
        console.log('   los pdf resultantes el titulo de la primera columna del csv debe ser "name".');
    console.groupEnd('Archivos')
console.groupEnd('Pasos');
console.group('Comandos');
    console.log('npm run pdf_script: para iniciar la extraccion');
    console.log('npm run reset_pdf_dir: para limpiar los directorios');
    console.log('npm run pdf_help: para mostrar estas instrucciones');
console.groupEnd('Comandos');
console.log('Nota: por el momento solamente se pueden extraer 3 paginas de todos los pdf')
console.log('');
console.log('Node: v14.15.1');
console.log('Script desarrollado por Alejandro Dubon - github: @DubAvenXP - Contacto dubavenxp@gmail.com');