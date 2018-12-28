import * as fs from "fs";

const file = './project.batch.json';
const ary: string[] = require(file);

console.log(`terraforming ${ary.length} entries`);

const f = fs.createWriteStream('./projects.terraformed.txt');
ary.forEach(entry => {
  const filename = `./topics/projects/${entry}`;
  const url = `https://divisare.com/projects/${entry}.html`;
  f.write(`${filename} ${url}\n`)
});
