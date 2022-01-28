const listHelper = require('../utils/list_helper')

describe('blog list', () => {
    test('sum of likes', () => {
      const blogs = [{name: "blog1", likes: 5}, {name: "blog2", likes: 6}]
    
      const result = listHelper.totalLikes(blogs)
      expect(result).toBe(1)
    })

    test('most of likes', () => {
        const blogs = [{name: "blog1", likes: 5}, {name: "blog2", likes: 6}]
      
        const result = listHelper.mostLikes(blogs)
        expect(result).toBe(1)
      })

})


/*describe('blog list', () => {
test('dummy returns one', () => {
  const blogs = ["blog1", "blog2"]

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
})*/