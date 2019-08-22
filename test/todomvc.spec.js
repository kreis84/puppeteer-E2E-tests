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
      headless: false,
      slowMo: 100,
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

  // for(var i = 0; i< 3; i++){
  it('should display a todo after it was added', async () => {
    page.wait
    
    // act
    await po.addTodo('kup piwo!')

    // assert
    let items = await po.visibleTodosCount()
    expect(items).toEqual(1)

    let includes = await po.todoWithLabelIsDisplayed("kup piwo")
    expect(includes).toBeTruthy()
  })
  // }

  it('should display filtered todos', async () => {
    // act
    const todos = [
      'kup piwo',
      'wyrzuć śmieci', // [X]
      'pozmywaj',
      'skręć meble', // [X]
      'ogarnij się'
    ]
    for (let todo of todos){
      await po.addTodo(todo)
    }

    // assert
    let items = await po.visibleTodosCount()
    expect(items).toEqual(5)

    await po.setTodoCompleted(1)

    await po.setTodoCompleted(3)
    
  }, 100000)
})
