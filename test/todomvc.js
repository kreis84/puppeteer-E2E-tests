const puppeteer = require('puppeteer')
const chalk = require('chalk')

const { sleep } = require('./utils')


const URL = 'http://todomvc.com/examples/jquery/';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 100,
  })

  // console.log(puppeteer.defaultArgs())

  const page = await browser.newPage()
  await page.goto(URL, { waitUntil: 'networkidle2' })

  // gdyby to było dynamiczne
  await page.waitForSelector('.new-todo')

  for (var i = 0; i< 3; i++){
    await page.click('.new-todo')
    await page.keyboard.type(`kup piwo ${i + 1}`)
    await page.keyboard.up('\n')
  }

  const idx = 0

  await page.evaluate((idx) => {
    document.querySelectorAll('input.toggle')[idx].click()
  }, idx)

  // page.evaluate -> wykonaj side-effecty w przegl.
  // page.$eval -> oblicz coś na podst. pojedynczego selektora
  // page.$$eval -> oblicz coś na podst. selektora zwracającego arraya

  let items
  items = await page.$$eval('.todo-list .view', todoItems => todoItems.length)
  console.log('all items:', chalk.yellow(items))

  await sleep(3000)

  await browser.close()
})()
