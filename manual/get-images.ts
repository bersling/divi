import * as fs from 'fs';
import * as path from 'path';
import * as request from 'request';

const images = require('./images.no-host.json');

export const getImage = (host: string, partial: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const fileAlreadyExists = fs.existsSync(partial);
    if (fileAlreadyExists) {
      console.log('already exists');
      resolve();
    } else {
      const folder = path.dirname(partial);
      fs.mkdirSync(folder, {recursive: true});
      const f = fs.createWriteStream(partial);
      const uri = host + partial;
      const pipedReq = request(uri).pipe(f);
      pipedReq.on('close', () => {
        console.log('written');
        resolve();
      });
    }
  });
};

const CDN = `https://divisare-res.cloudinary.com/`;

const doRun = async () => {
  for (let partial of images) {
    await getImage(CDN, partial);
  }
};
doRun();
