import {readdirSync, readFileSync} from 'fs';
import * as fs from "fs";

export const rootDir = '../topics/';

export const serverMapping = {
  "116.203.37.214": 0,
  "116.203.37.221": 1,
  "116.203.37.219": 2,
  "116.203.37.216": 3,
  "116.203.37.215": 4,
  "116.203.37.218": 5,
  "116.203.30.199": 6,
  "116.203.37.217": 7,
  "116.203.37.153": 8,
  "116.203.36.140": 9
};

export function getTopicFiles() {
  return readdirSync(rootDir, 'utf8').filter(fileName => fileName.includes('.html'));
}

export function getProjectFiles() {
  return readdirSync(rootDir + 'projects', 'utf8').filter(fileName => fileName.includes('.html'));
}


export const extractImagesFromFiles = (files, f, root) => {
  files.forEach(filePath => {
    const fileContent: string = readFileSync(root + filePath, 'utf8');
    const dataSrcRegex = /data-src="(.*?)"/g;
    let match = dataSrcRegex.exec(fileContent);
    while (match != null) {
      f.write(`"${match[1]}",\n`);
      match = dataSrcRegex.exec(fileContent);
    }
  });
};

export interface ExtracedImageResponse {
  cdn: string;
  partials: string[];
}


const fileLogger = (msg: string) => {
  fs.appendFileSync('log.txt', msg);
};

const consoleLogger = (msg: string) => {
  console.log(msg);
};

export const logger = (msg: string) => {
  fileLogger(msg);
};


export const extractImages = (files, root): ExtracedImageResponse => {
  const extracedImageResponse: ExtracedImageResponse = {
    cdn: 'https://divisare-res.cloudinary.com',
    partials: []
  };
  files.forEach(filePath => {
    const fileContent: string = readFileSync(root + filePath, 'utf8');
    const dataSrcRegex = /data-src="https:\/\/divisare-res\.cloudinary\.com\/(.*?)"/g;
    let match = dataSrcRegex.exec(fileContent);
    while (match != null) {
      extracedImageResponse.partials.push(match[1]);
      match = dataSrcRegex.exec(fileContent);
    }
  });
  return extracedImageResponse;
};

