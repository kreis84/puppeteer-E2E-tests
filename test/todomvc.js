const puppeteer = require('puppeteer')

const { sleep } = require('./utils')


const URL = 'http://todomvc.com/examples/jquery/';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })

  const page = await browser.newPage()
  await page.goto(URL)

  await sleep(3000)

  await browser.close()
})()
