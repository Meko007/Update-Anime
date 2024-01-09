import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.USERNOM as string;
const password = process.env.PASSWORD as string;

export const update = async (url: string) => {

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

	await page.setDefaultNavigationTimeout(120000);
	await page.goto(url);

	await page.click('#malLogin');

	await page.waitForSelector('input[id = "loginUserName"]');
	await page.type('input[id = "loginUserName"]', username, { delay: 100 });
	await page.waitForSelector('#login-password');
	await page.type('#login-password', password, { delay: 100 });
	await page.click('input[type = "submit"]');

	// await page.evaluate(() => {
	//     const form = document.querySelector('form.recaptcha-form');
	//     form.submit();
	// });

	await page.waitForNavigation();

	await page.waitForTimeout(3000);

	await page.click('.js-btn-count');

	await page.waitForSelector('.btn-close');
	await page.click('.btn-close');

	await page.waitForTimeout(5000);
	await browser.close();
};