import * as fs from 'fs';
import {extractImagesFromFiles, getProjectFiles, rootDir} from './utils';
import * as path from 'path';
const doRun = () => {
  const f = fs.createWriteStream('project-images.json');
  f.write('[');
  const projectFiles: string[] = getProjectFiles();
  extractImagesFromFiles(projectFiles, f, path.join(rootDir, `projects/`));
  f.write(']');
};
doRun();
