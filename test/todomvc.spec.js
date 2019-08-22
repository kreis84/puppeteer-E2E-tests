const puppeteer = require('puppeteer')
const chalk = require('chalk')
const assert = require('assert')
const { TodomvcPO } = require('./po/todomvc.po')


const { sleep } = require('./utils')
const URL = 'http://todomvc.com/examples/jquery/'

describe('todomvc application', () => {
  let browser, page, po

  beforeAll(async () => {
    browser = await puppeteer.launch({
      // headless: false,
      slowMo: 50,
      // executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    })
    // console.log(puppeteer.defaultArgs())
  })

  afterAll(async () => {
    await browser.close()
  })

  beforeEach(async () => {  
    page = await browser.newPage()
    po = TodomvcPO(page)
    await page.goto(URL, { waitUntil: 'networkidle2' })
  }, 100000)

  afterEach(async () => {
    await page.evaluate(() => {
      localStorage.removeItem('todos-jquery')
    })
    await page.close()
  })

  for(var i = 0; i< 3; i++){
  it('should display a todo after it was added', async () => {
    // act
    po.addTodo('kup piwo!')

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
  }
})
