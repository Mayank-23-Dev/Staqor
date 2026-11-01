const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE_DIR = 'E:\\50 Question HTML CSS JS';

async function captureAll() {
    console.log('Launching Chrome for batch screenshots...');
    const browser = await puppeteer.launch({
        executablePath: CHROME_PATH,
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });

    const folders = fs.readdirSync(BASE_DIR)
        .filter(f => /^\d{2}-/.test(f) && fs.statSync(path.join(BASE_DIR, f)).isDirectory())
        .sort();

    console.log(`Found ${folders.length} question folders to capture.`);

    for (let i = 0; i < folders.length; i++) {
        const folder = folders[i];
        const htmlPath = path.join(BASE_DIR, folder, 'index.html');
        const outPath = path.join(BASE_DIR, folder, 'screenshot.png');

        if (!fs.existsSync(htmlPath)) {
            console.warn(`Skipping ${folder}: index.html not found`);
            continue;
        }

        const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
        try {
            await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 15000 });
            // Small pause for animations / webfonts
            await new Promise(r => setTimeout(r, 400));
            await page.screenshot({ path: outPath, fullPage: false });
            console.log(`[${i + 1}/${folders.length}] Captured: ${folder}/screenshot.png`);
        } catch (err) {
            console.error(`Error capturing ${folder}:`, err.message);
        }
    }

    // Capture Master Hub index.html
    const masterHtmlPath = path.join(BASE_DIR, 'index.html');
    const masterOutPath = path.join(BASE_DIR, 'hub-preview.png');
    if (fs.existsSync(masterHtmlPath)) {
        await page.goto('file:///' + masterHtmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
        await new Promise(r => setTimeout(r, 500));
        await page.screenshot({ path: masterOutPath, fullPage: false });
        console.log('Captured Master Hub: hub-preview.png');
    }

    await browser.close();
    console.log('All 50 real screenshots captured successfully!');
}

captureAll().catch(err => {
    console.error('Fatal error during capture:', err);
    process.exit(1);
});
