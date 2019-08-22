describe('EXAMPLE JEST TESTS', () => {
  it('some test', () => {
    expect(1 + 2).toEqual(3)
  })

  it('some test', () => {
    expect(1 + 3).not.toEqual(3)
  })

  it('some test', () => {
    expect.assertions(1)
    const p = Promise.resolve(125)
    p.then(value => {
      expect(value).toEqual(125)
    })
    return p
  })
})
