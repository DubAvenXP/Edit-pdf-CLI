import { userInfo  } from 'os';
import pkg from 'csvtojson';
const { csv } = pkg;

const username = userInfo().username;
const csvFile = `C:/Users/${username}/OneDrive/Documentos/index.csv`;

async function generateFileNames() {
    return await csv().fromFile(csvFile);;
}

const fileNames = await generateFileNames();
export { fileNames };

// const path = `C:/Users/${username}/Downloads/${filename}`;