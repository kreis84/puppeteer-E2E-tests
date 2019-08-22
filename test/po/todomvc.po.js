const TodomvcPO = (page) => ({

  selectors: {
    newTodoInput: '.new-todo',
    todoItems: '.todo-list .view',
  },

  async addTodo(label){
    await page.click(this.selectors.newTodoInput)
    await page.keyboard.type(label)
    await page.keyboard.up('\n')
  },

  async visibleTodosCount(){
    return page.$$eval(this.selectors.todoItems,
      todoItems => todoItems.length)
  },

  async todoWithLabelIsDisplayed(phrase){
    return page.$$eval('.todo-list .view',
      (items, phrase) => Array.from(items)
        .find(node => node.innerText.includes(phrase)),
      phrase
    )
  },

  async clickTodo(idx){
    // p:nth-child(idx) // https://www.w3schools.com/cssref/sel_nth-child.asp
    return page.evaluate((idx) => {
      document.querySelectorAll('.todo-list .view')[idx]
        .querySelector('.toggle').click()
    }, idx)
  },

  async todoIsChecked(idx){
    return page.$$eval('.todo-list .view',
      (items, idx) => items[idx]
        .querySelector('.toggle').checked,
      idx
    )
  },

  async setTodoCompleted(idx){
    const isChecked = await this.todoIsChecked(idx)
    if (!isChecked){
      await this.clickTodo(idx)
    }
  },

  async setTodoActive(idx){
    const isChecked = await this.todoIsChecked(idx)
    if (isChecked){
      await this.clickTodo(idx)
    }
  }
})

module.exports = {
  TodomvcPO,
}
