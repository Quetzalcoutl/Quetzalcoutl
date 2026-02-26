const puppeteer = require('puppeteer');

(async () => {
  // specify local Chrome to avoid missing binary
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  page.on('console', msg => {
    console.log('PAGE LOG:', msg.text());
  });
  page.on('pageerror', err => {
    console.error('PAGE ERROR:', err);
  });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });
  console.log('Loaded page');
  // wait a bit to capture later logs
  await page.waitForTimeout(5000);
  await browser.close();
})();
