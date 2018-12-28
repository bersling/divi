import * as fs from 'fs';
import {extractImagesFromFiles, rootDir} from './utils';
import * as path from 'path';
import {readdirSync, readFileSync} from 'fs';

export function getMissingFiles() {
  return readdirSync('./mocks', 'utf8')
}

const doRun = () => {
  const f = fs.createWriteStream('project-images.json');
  f.write('[');
  const missingFiles: string[] = getMissingFiles();
  extractImagesFromFiles(missingFiles, f, path.join(rootDir, `projects/`));
  f.write(']');
};
// doRun();

const m = getMissingFiles();
console.log(m);
