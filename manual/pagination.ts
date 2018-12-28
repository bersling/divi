import * as https from 'https';
const fs = require('fs');

const pages = require('./starting-point.json');
// const pages = ['/airports'];

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

const lastPageRegex = new RegExp(escapeRegExp(`<a href="/publications/`) + '[a-z\'-]+' + escapeRegExp(`?page=`) + '(\\d+)' + escapeRegExp(`">Last &raquo;</a>`));

const outFileName = 'pagination.compare.json';

const getPagination = (page: string) => {
  console.log(`getting for ${page}`);
  https.get(page, (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      // console.log(rawData);
      const match = rawData.match(lastPageRegex);
      if (match) {
        console.log(match[1]);
        fs.appendFile(outFileName, `\n"${page}": ${match[1]},`);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
};

const doRun = () => {
  fs.writeFileSync(outFileName,'{',{encoding:'utf8',flag:'w'});
  pages.forEach(page => {
    getPagination('https://divisare.com' + page);
  });
  // you'll need to fix the output json...
};
// doRun();
