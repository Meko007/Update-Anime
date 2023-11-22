const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    initialisePuppeteer();
    console.log(`server is running on port: ${PORT}`);
});

const url = 'https://myanimelist.net/anime/54595/Kage_no_Jitsuryokusha_ni_Naritakute_2nd_Season';

const initialisePuppeteer = async () => {
    const browser = await puppeteer.launch({ headless: false });

    const page = await browser.newPage();

    await page.viewport({
        width: 1920,
        height: 1080
    });

    await page.goto(url);

    await page.waitForSelector('div[class = "tbl-next-up-closeBtn"]');
    await page.click('div[class = "tbl-next-up-closeBtn"]');

    // await page.waitForSelector('button');
    // await page.click('button');

    await page.click('a[id = "malLogin"]');

    await page.type('input[id = "loginUserName"]', process.env.USERNAME);
    await page.type('input[id = "password"]', process.env.PASSWORD);
    await page.click('button[type = "submit"]');

    await page.click('a[class = "js-btn-count increase ml4"]');
}