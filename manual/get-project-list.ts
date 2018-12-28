import * as fs from 'fs';
import {readFileSync} from 'fs';
import {getTopicFiles} from './utils';

const pages = require('./starting-point.json');

const rootDir = './topics/';

const f = fs.createWriteStream('projects.json');

f.write('[');

const extractProjectsFromTopic = (topicFiles) => {
  topicFiles.forEach(topicFile => {
    const fileContent: string = readFileSync(rootDir + topicFile, 'utf8');
    const projectsRegex = /href="\/projects\/(.*?)"/g;
    let match = projectsRegex.exec(fileContent);
    while (match != null) {
      f.write(`"${match[1]}",\n`);
      match = projectsRegex.exec(fileContent);
    }
  });
};

const doRun = () => {
  extractProjectsFromTopic(getTopicFiles());
  // you'll need to fix the resulting json
};
doRun();
