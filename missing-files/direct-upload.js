const fs = require('fs');
const request = require('request');
const AWS = require('aws-sdk');
const s3root = `https://s3.eu-central-1.amazonaws.com/divi-projects/`;
const s3Stream = require('s3-upload-stream')(new AWS.S3());

fs.mkdirSync(`tmp`, {recursive: true});


const server = process.argv[2];
let current = 0;
let batchSize = null;
const processId = new Date().getTime();

const servers = [
  "116.203.37.214",
  "116.203.37.221",
  "116.203.37.219",
  "116.203.37.216",
  "116.203.37.215",
  "116.203.37.218",
  "116.203.30.199",
  "116.203.37.217",
  "116.203.37.153",
  "116.203.36.140"
];

fs.mkdirSync('tmp',{recursive: true});

getBatch().then(batch => {
  iterateOverProjectFiles(batch);
});

//error handling
process.on('uncaughtException', function(err) {
  logger('Caught exception: ' + err);
});

//============================================================//

// getting the batch;
function getBatch() {
  return new Promise(async resolve => {
    const files = (await readFileFromUrl('https://s3.eu-central-1.amazonaws.com/divi-projects/000-filenames.txt'))
        .split('\n')
        .filter(fileName => fileName.includes('.html')); // to remove the 000-filenames that accidently landed in there itself...
    const numFiles = files.length;
    batchSize = Math.ceil(numFiles / servers.length);
    const serverNumber = servers.indexOf(server);
    const start = serverNumber * batchSize + current;
    const end = (serverNumber + 1) * batchSize;
    const firstFile = files.slice(start, end)[0];
    logger(JSON.stringify({start, end, batchSize, numFiles, firstFile}));
    resolve(files.slice(start, end));
  })
}

// The main inner loop:
async function doStep(filePath) {
  current = current + 1;
  // if (isUnprocessed(filePath)) {
  //
  // } else {
  //   logger(`${filePath} has already been processed`)
  // }

  // markAsProcessed(filePath);
  const contents = await readFileFromUrl(s3root + filePath);
  const images = getImages(contents);
  logger(`found ${images.length} images`);
  const promises = [];
  let idx = 0;
  for (let image of images) {
    promises.push(uploadImageToS3(image, idx++));
  }
  await Promise.all(promises);
  logger(`processed ${current} / ${batchSize}`);

}

// the main outer loop:
async function iterateOverProjectFiles(batch) {
  for (let file of batch) {
    await doStep(file);
  }
}

// HELPERS

function getImages(fileContent) {
  const foundImages = [];
  const dataSrcRegex = /data-src="(.*?)"/g;
  let match = dataSrcRegex.exec(fileContent);
  while (match != null) {
    foundImages.push(match[1]);
    match = dataSrcRegex.exec(fileContent);
  }
  return foundImages;
}


// this could be optimized by only uploading if not exists
async function uploadImageToS3(imageUrl, idx) {

  const image = await readImageFromUrl(imageUrl, idx);

  const imagePath = imageUrl.split(`https://divisare-res.cloudinary.com/`)[1];
  const objectParams = {
    Bucket: 'bersling-divisaire',
    // i already created /aaa-testing, /testing and testing :)
    Key: `images6/${imagePath}`,
    Body: image,
    ContentType: 'image/jpg'
  };
  // Create object upload promise
  const uploadPromise = new AWS.S3({apiVersion: '2006-03-01', region: 'eu-central-1'})
      .putObject(objectParams)
      .promise();
  uploadPromise
      .then((data) => {
        // nothing to do...
        logger(`uploaded image...`);
      }).catch(err => {
        logger("ERROR");
        logger(err);
      });
  return uploadPromise;


}

// UTILS
function readFileFromUrl(path) {
  return new Promise(resolve => {
    request(path, function (error, response, body) {
      resolve(body);
    });
  });
}

function markAsProcessed(fileName) {
  fs.writeFileSync(`./tmp/${fileName}`, '');
}

function isUnprocessed(fileName) {
  return !fs.existsSync(`./tmp/${fileName}`);
}

function logger(msg) {
  console.log(msg);
  fs.appendFileSync(`log-${processId}.log`, msg + '\n');
}



// ==== file write / read hack
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 20; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// for some whacky reason it doesn't work when retrieved simply like with readFileFromUrl ...
function readImageFromUrl(path, idx) {
  return new Promise(resolve => {
    const f = fs.createWriteStream(`tmp-img${idx}.jpg`);
    const pipedReq = request(path).pipe(f);
    pipedReq.on('close', () => {
      const image = fs.readFileSync(`tmp-img${idx}.jpg`);
      resolve(image);
    });
  })
}
