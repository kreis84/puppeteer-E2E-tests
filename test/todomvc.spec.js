const puppeteer = require('puppeteer')
const chalk = require('chalk')
const assert = require('assert')

const { sleep } = require('./utils')
const URL = 'http://todomvc.com/examples/jquery/'

describe('todomvc application', () => {
  let browser, page

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    })
  
    // console.log(puppeteer.defaultArgs())
  
    page = await browser.newPage()
    await page.goto(URL, { waitUntil: 'networkidle2' })
    console.log(browser == undefined)
  }, 100000)

  afterEach(async () => {
    console.log(browser == undefined)
    await browser.close()
  })

  it('should display a todo after it was added', async () => {
    console.log(browser == undefined)

    // act
    await page.click('.new-todo')
    await page.keyboard.type(`kup piwo!`)
    await page.keyboard.up('\n')

    // assert
    let items
    items = await page.$$eval('.todo-list .view', todoItems => todoItems.length)
    expect(items).toEqual(1)

    let phrase = "kup piwo"
    await page.$$eval('.todo-list .view',
      (items, phrase) => Array.from(items)
        .find(node => node.innerText.includes(phrase)),
      phrase
    )
  })
})
