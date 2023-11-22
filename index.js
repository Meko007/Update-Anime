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
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized']
         });

        const page = await browser.newPage();

        // await page.viewport({
        //     width: 1920,
        //     height: 1080
        // });

        await page.setDefaultNavigationTimeout(60000);
        await page.goto(url);

        
        await page.click('#malLogin');
        
        await page.waitForSelector('input[id = "loginUserName"]');
        await page.type('input[id = "loginUserName"]', process.env.USERNOM, { delay: 100 });
        await page.waitForSelector('#login-password');
        await page.type('#login-password', process.env.PASSWORD, { delay: 100 });
        await page.click('input[type = "submit"]');
        
       
        await page.evaluate(() => {
            const form = document.querySelector('form.recaptcha-form');
            form.submit();
        });

        await page.waitForNavigation();
    
        await page.waitForTimeout(3000);

        await page.click('.js-btn-count');

        await page.waitForSelector('.btn-close');
        await page.click('.btn-close');
        
    } catch (err){
        console.log(err);
    }
};