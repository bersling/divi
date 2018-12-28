import * as fs from 'fs';
import * as path from 'path';
import * as request from 'request';

const args = process.argv.slice(2);

export const getImage = (host: string, fullPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const partial = fullPath.split(`https://divisare-res.cloudinary.com/`)[1];
    const outDir = `../out`;
    const targetPath = `${outDir}/${partial}`;
    fs.mkdirSync('logs', {recursive: true});
    fs.mkdirSync(outDir, {recursive: true});
    const fileAlreadyExists = fs.existsSync(targetPath);
    if (fileAlreadyExists) {
      fs.appendFileSync('logs/images.logs.txt', `already exists\n`);
      resolve();
    } else {
      foundNewImages = true;
      const folder = path.dirname(targetPath);
      fs.mkdirSync(folder, {recursive: true});
      const f = fs.createWriteStream(targetPath);
      const uri = `${host}/${partial}`;
      const pipedReq = request(uri).pipe(f);
      pipedReq.on('close', () => {
        fs.appendFileSync('logs/images.logs.txt', `written\n`);
        resolve();
      });
    }
  });
};

const doRun = async (batchNumber: number) => {
  const partials = require(`./batches/image-batch${batchNumber}.json`);
  const cdn = 'https://divisare-res.cloudinary.com';
  for (let partial of partials) {
    await getImage(cdn, partial);
  }
  fs.mkdirSync('logs', {recursive: true});
  fs.appendFileSync('logs/found-new-images.txt', `${foundNewImages}\n`);
};


// Running script
fs.mkdirSync('logs', {recursive: true});
let foundNewImages = false;
let batchNumber = null;
try {
  batchNumber = parseInt(args[0]);
  fs.appendFileSync('logs/stdout.txt', `batch number: ${batchNumber}`);
  if (isNaN(batchNumber)) {
    fs.appendFileSync('logs/errors.txt', `NaN arg provided\n`);
    process.exit(1);
  } else {
    doRun(batchNumber);
  }
} catch (e) {
  fs.appendFileSync('logs/errors.txt', `no arg provided\n`);
  process.exit(1);
}



