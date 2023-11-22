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

        // const [response] = await Promise.all([
        //     await page.waitForNavigation(),
        //     await page.click('#malLogin'),
        //     await page.waitForSelector('input[id = "loginUserName"]'),
        //     await page.type('input[id = "loginUserName"]', process.env.USERNAME),
        //     await page.waitForSelector('#login-password'),
        //     await page.type('#login-password', process.env.PASSWORD),
        //     await page.click('button[type = "submit"]')
        // ]);

        // await page.waitForNavigation();
        await page.click('#malLogin');
        // await page.waitForSelector('.button-wrapper');
        // await page.click('.button-wrapper');
        await page.waitForSelector('input[id = "loginUserName"]');
        await page.type('input[id = "loginUserName"]', process.env.USERNOM, { delay: 300 });
        await page.waitForSelector('#login-password');
        await page.type('#login-password', process.env.PASSWORD, { delay: 300 });
        await page.click('.pt16.ac', { delay: 100 });
        // await page.waitForNavigation();
        // await page.evaluate(async () => {
        //     await page.waitForSelector('input[id = "loginUserName"]');
        //     await page.type('input[id = "loginUserName"]', process.env.USERNOM);
        //     await page.waitForSelector('#login-password');
        //     await page.type('#login-password', process.env.PASSWORD);
        //     await page.click('button[type = "submit"]');
        // });

        await page.evaluate(() => {
            const form = document.querySelector('form.recaptcha-form');
            form.submit();
        });

        await page.waitForNavigation();
    
        await page.waitForTimeout(30000);

        await page.click('.js-btn-count');
        
    } catch (err){
        console.log(err);
    }
};