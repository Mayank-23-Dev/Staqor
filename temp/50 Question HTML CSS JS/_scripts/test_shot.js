const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_DIR = 'E:\\50 Question HTML CSS JS';

async function capture() {
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });

    const htmlPath = path.join(BASE_DIR, '01-typography-font-showcase', 'index.html');
    await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

    const outPath = path.join(BASE_DIR, '01-typography-font-showcase', 'screenshot.png');
    await page.screenshot({ path: outPath, fullPage: false });

    console.log('Saved screenshot to:', outPath);
    await browser.close();
}

capture().catch(err => {
    console.error(err);
    process.exit(1);
});
