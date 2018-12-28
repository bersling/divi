import * as fs from 'fs';

fs.mkdirSync('dist', {recursive: true});
const filesToCopy = [
  'tsconfig.json',
  'package.json',
  // 'get-projects.ts',
  'download-project-images.ts',
  // 'project.batch.json',
  'utils.ts'
];
filesToCopy.forEach(file => {
  fs.copyFileSync(file, `./dist/${file}`);
});
for (let i = 0; i < 10; i++) {
  const a = `batches/batch${i}.json`;
  const b = `batches/image-batch${i}.json`;
  fs.mkdirSync('./dist/batches', {recursive: true});
  fs.copyFileSync(`./${a}`, `./dist/${a}`);
  fs.copyFileSync(`./${b}`, `./dist/${b}`);
}
