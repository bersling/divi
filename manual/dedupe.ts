import * as fs from "fs";

const file = './projects.json';
const ary: string[] = require(file);

console.log(`started with ${ary.length}`);

const map = {};
ary.forEach(entry => {
  map[entry] = true;
});

console.log(`reduced to ${Object.keys(map).length}`);

// const f = fs.createWriteStream('./project.batch.json');
// f.write(JSON.stringify(Object.keys(map)));
