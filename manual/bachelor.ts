import * as fs from "fs";

const projects: string[] = require('./project.batch.json');

const batches = [];
projects.forEach((project, idx) => {
  batches[idx % 10] = batches[idx % 10] ? [...batches[idx % 10], project] : [project];
});

let sum = 0;

batches.forEach((batch, idx) => {
  sum += batch.length;
  console.log(`writing a batch with ${batch.length} entries.`);
  const f = fs.createWriteStream(`./batch${idx}.json`);
  f.write(JSON.stringify(batch));
});

console.log(`summed up to ${sum}==${projects.length}`);
