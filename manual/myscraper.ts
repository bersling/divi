const puppeteer = require('puppeteer');

console.log('starting...');


puppeteer.launch().then(async browser => {
  console.log('launching...');
  const page = await browser.newPage();

  await page.goto('https://www.taskbase.com', {waitUntil: 'networkidle0'});
  // await page.waitForSelector('body.blog');

  // The values returned from evaluate function should be json serializeable.
  const result = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h1')).map((element) => element.innerHTML);
  });

  // let's close the browser
  await browser.close();

  console.log(result);
  process.exit();
}).catch(function(error) {
  console.error('No way Paco!');
  process.exit();
});
