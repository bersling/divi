import {readdirSync, readFileSync} from 'fs';

export const rootDir = '../topics/';

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

