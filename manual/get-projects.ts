import * as fs from 'fs';
import * as path from 'path';
import * as request from 'request';

const projects = require('./project.batch.json');

export const downloadFile = (host: string, partial: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const filename = `./topics/${partial}.html`;
    const fileAlreadyExists = fs.existsSync(filename);
    if (fileAlreadyExists) {
      console.log('already exists');
      resolve();
    } else {
      const folder = path.dirname(filename);
      fs.mkdirSync(folder, {recursive: true});
      const f = fs.createWriteStream(filename);
      const uri = host + partial;
      const pipedReq = request(uri).pipe(f);
      pipedReq.on('close', () => {
        console.log('written');
        resolve();
      });
    }
  });
};

const root = `https://divisare.com/`;

const doRun = async () => {
  for (let project of projects) {
    // take care not to put slash in partial
    await downloadFile(root, `projects/${project}`);
  }
};
doRun();
