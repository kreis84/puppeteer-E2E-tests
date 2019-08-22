const puppeteer = require('puppeteer')

const { sleep } = require('./utils')


const URL = 'http://todomvc.com/examples/jquery/';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  })

  const page = await browser.newPage()
  await page.goto(URL, { waitUntil: 'networkidle2' })

  // gdyby to było dynamiczne
  await page.waitForSelector('.new-todo')

  for (var i = 0; i< 15; i++){
    await page.click('.new-todo')
    await page.keyboard.type(`kup piwo ${i}`)
    await page.keyboard.up('\n')
  }

  await sleep(3000)

  await browser.close()
})()
