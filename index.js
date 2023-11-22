const express = require('express');
const puppeteer = require('puppeteer');
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    initialisePuppeteer();
    console.log(`server is running on port: ${port}`);
});

const url = 'https://myanimelist.net/anime/54595/Kage_no_Jitsuryokusha_ni_Naritakute_2nd_Season';

const initialisePuppeteer = async () => {
    try{
        const browser = await puppeteer.launch({ headless: false });

        const page = await browser.newPage();

        await page.viewport({
            width: 2560,
            height: 1440
        });

        await page.setDefaultNavigationTimeout(60000);
        await page.goto(url);

        // await page.waitForSelector('div[class = "tbl-next-up-closeBtn"]');
        // await page.click('div[class = "tbl-next-up-closeBtn"]');
        // await page.waitForTimeout(10000);

        // await page.waitForSelector('button');
        // await page.click('button');

        const [response] = await Promise.all([
            page.waitForNavigation(),
            page.click('#malLogin'),
            page.waitForSelector('#loginUserName'),
            page.type('#loginUserName', process.env.USERNAME),
            page.waitForSelector('#login-password'),
            page.type('#login-password', process.env.PASSWORD),
            page.click('.inputButton')
        ]);
        
        await page.waitForTimeout(30000);

        await page.click('.js-btn-count');
        
    } catch (err){
        console.log(err);
    }
};