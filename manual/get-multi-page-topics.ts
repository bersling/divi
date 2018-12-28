import * as https from 'https';
import * as fs from 'fs';

const pagination: {[pageName: string]: number} = require('./pagination.json');
// const pagination: {[pageName: string]: number} = require('./pagination.mock.json');

const getPaginatedTopic = (topic: string, pageNum: number) => {
  const outFilePath = `./topics/${topic}-${pageNum}.html`;
  const f = fs.createWriteStream(outFilePath);
  const page = `https://divisare.com/${topic}?page=${pageNum}`;
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
  Object.keys(pagination).forEach(topic => {
    const numPages: number = pagination[topic];
    const startPage = 2;
    for (let currentPage = startPage; currentPage <= numPages; currentPage++) {
      getPaginatedTopic(topic, currentPage);
    }
  });
};
doRun();
