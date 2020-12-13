# Edit-pdf-CLI
This is a experimental project to extract PDF pages from the CLI with some requirements
Instrucciones para correr el script
Pasos
1. Asegurate de tener una carpeta con el nombre "pdfDir" en la ruta OneDrive/Documentos
2. Dentro de pdfDir deben existir lo siguiente...
Archivos
        a. La carpeta src que posee los PDF para extraer informacion.
        b. La carpeta result que tendra todos los PDF resultantes de la extraccion.
        c. El archivo csv index.csv que debe tener los nombre con los que se quiere nombrar
        los pdf resultantes el titulo de la primera columna del csv debe ser "name".
Comandos
    npm run pdf_script: para iniciar la extraccion.
    npm run reset_pdf_dir: para limpiar los directorios.
    npm run pdf_help: para mostrar estas instrucciones.
Nota: por el momento solamente se pueden extraer 3 paginas de todos los pdf.

Node: v14.15.1Script desarrollado por Alejandro Dubon - github: @DubAvenXP - Contacto dubavenxp@gmail.com
