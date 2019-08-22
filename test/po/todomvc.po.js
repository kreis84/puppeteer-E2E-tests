const TodomvcPO = (page) => ({

  selectors: {
    newTodoInput: '.new-todo'
  },

  async addTodo(label){
    await page.click(this.selectors.newTodoInput)
    await page.keyboard.type(label)
    await page.keyboard.up('\n')
  }
})

module.exports = {
  TodomvcPO,
}
