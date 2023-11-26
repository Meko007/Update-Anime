import express from 'express';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    // update();
    console.log(`server is running on port: ${port}`);
});


const update = async (url) => {
    // try{
    const browser = await puppeteer.launch({
        headless: false, // or `headless: "new"`
        defaultViewport: null,
        args: ['--start-maximized']
        });

    const page = await browser.newPage();

    // await page.viewport({
    //     width: 1920,
    //     height: 1080
    // });

    await page.setDefaultNavigationTimeout(240000);
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
    
    await page.waitForTimeout(5000);
    await browser.close();

    console.log("Done");
    // } catch (err){
    //     console.log(err);
    // }
};
// update('https://myanimelist.net/anime/51009/Jujutsu_Kaisen_2nd_Season');
// update('https://myanimelist.net/anime/55644/Dr_Stone__New_World_Part_2');