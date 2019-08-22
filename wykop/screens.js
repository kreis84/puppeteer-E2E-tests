const puppeteer = require('puppeteer')
const chalk = require('chalk')

const URL = 'https://www.wykop.pl/';

(async function(){
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--incognito',
    ],
  })

  const pages = await browser.pages()
  const page = pages[0]

  // const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle2' })

  const dimensions = [
    [640, 480],
    [800, 600],
    [1024, 768],
    [1280, 800],
    [1600, 1200],
    [1920, 1200],
  ]
  for (let [width, height] of dimensions){
    await page.setViewport({
      height,
      width,
      deviceScaleFactor: 1,
    })
    const file = `wykop-${width}-${height}.png`
    await page.screenshot({ path: file })
    console.log(chalk.green(`screenshot ${file} taken`))
  }

  // await page.pdf({ path: 'wykop.pdf', format: "A4" })

  await browser.close()
})()
