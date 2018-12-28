import * as https from 'https';
import * as fs from 'fs';

const pages = require('./starting-point.json');
// const pages = ['/roma'];

// create an empty topics folder before you run this script

const getTopic = (host: string, partial: string) => {
  const outFilePath = `./topics/${partial.split('/')[1]}.html`;
  const f = fs.createWriteStream(outFilePath);
  const page = host + partial;
  https.get(page, (res) => {
    res.setEncoding('utf8');
    res.pipe(f);
    f.on('finish', function() {
      f.close();
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
};

const doRun = () => {
  pages.forEach(partial => {
    getTopic('https://divisare.com', partial);
  });
};
// doRun();
