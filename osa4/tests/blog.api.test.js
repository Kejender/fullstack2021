const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'blog1',
    author: 'jarmo',
    url: 'blog1.fi',
    likes: 5
  },
  {
    title: 'blog2',
    author: 'erkki',
    url: 'blog2.fi',
    likes: 6
  },
]

const initialBlogs2 = [
    {
      title: 'blog3',
      author: 'jorma',
      url: 'blog3.fi',
      likes: 5
    }
  ]

  const initialBlogs3 = [
    {
      title: 'blog4',
      author: 'erno',
      url: 'blog4.fi'
    }
  ]

  const initialBlogs4 = [{"title": "", "author": "urpo", "url": "", "likes": ""}]


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

/**
 test('there are two notes', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(2)
})
 */

/*app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })*/

test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    //expect(response.body).toHaveLength(2)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('id is included', async () => {
    const response = await api.get('/api/blogs')
    //console.log(response.body)

    response.body.forEach(element => expect(element.id).toBeDefined());

    //expect(element.id).toBeDefined());
    //expect(response.body[0].id).toBeDefined()
})

test('adding one blog works', async () => {
    const response1 = await api.get('/api/blogs')
    //expect(response.body).toHaveLength(initialBlogs.length)
    let blogObject = new Blog(initialBlogs2[0])
    await blogObject.save()
    const response2 = await api.get('/api/blogs')
    expect(response2.body).toHaveLength(initialBlogs.length+1)
})


test('adding one bad blog', async () => {
  //const response1 = await api.get('/api/blogs')
  let blogObject = new Blog(initialBlogs4[0])
  //const response = await blogObject.save()

  await api
  .post('/api/blogs')
  .send(blogObject)
  .expect(400)

  //response.expect(400)
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await api.get('/api/blogs')
      const blogToDelete = blogsAtStart.body[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await api.get('/api/blogs')

      expect(blogsAtEnd.body).toHaveLength(
        blogsAtStart.body.length - 1
      )

      //const contents = notesAtEnd.map(r => r.content)

      //expect(contents).not.toContain(noteToDelete.content)
    })
  })

afterAll(() => {
  mongoose.connection.close()
})