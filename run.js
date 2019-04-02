const puppeteer = require('puppeteer');
const readline = require('readline');

async function readText() {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the sms code\n', (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function login() {

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    try {
        await page.goto('http://163.net', {waitUntil: 'networkidle2'});

        let phoneNum = await readText();
        await page.type('#msg-phoneNum', phoneNum);

        await page.click('#msg-sendPassword');

        let sms = await readText();
        sms = sms.trim();

        console.log('sms typed');
        await page.type('#msg-authPassword', sms);
        await page.click('#msg-submitSms');

        console.log('clicked');
        await sleep(5000);
        console.log('go to baidu');

        await page.close();
        await browser.close();
    } catch (e) {
        await page.close();
        await browser.close();
    }
}

login();