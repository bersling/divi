import * as fs from 'fs';
import {extractImagesFromFiles, getTopicFiles} from './utils';
const f = fs.createWriteStream('images.json');
const doRun = () => {
  f.write('[');
  const topicFiles: string[] = getTopicFiles();
  extractImagesFromFiles(topicFiles, f, './topics/');
  f.write(']');
};
doRun();
