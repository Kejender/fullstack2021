const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const middleware = require('../utils/middleware')
const jwt = require('jsonwebtoken')

/*blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })*/

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log("loytyy")
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {

  logger.info("getting blogs")
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
});

  blogsRouter.post('/', async (request, response, next) => {
    console.log("post")
  //blogsRouter.post('/', (request, response) => {
    const body = request.body

    const token = getTokenFrom(request)
    console.log("token")
    const decodedToken = jwt.verify(token, process.env.SECRET)
    console.log("verify")
    if (!token || !decodedToken.id) {
      console.log("ei toimi")
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    //const user = await User.findById(body.userId)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    if (!blog.title && !blog.url) {
      console.log("eio")
      response.status(400).send({error: 'missing info'})
    }
    else {
    if (request.body.likes) {
      console.log("on")
    } else {
      console.log("ei")
      blog.likes = 0
      console.log("b", blog)
    }

    const savedBlog = await blog.save()
    console.log("savedblog", savedBlog)
    console.log("user", user)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(200).end()

// {"title": "erkki kertoo", "author": "erkki", "url": "raimo.fi", "likes": 9, "userId": "61f117a420fbbfa8d5e0e37b"}

    /*blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })*/
    }
  })

  blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

  blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }

    console.log(request.params.id)
  
    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      .then(updatedBlog => {
        response.json(updatedBlog)
      })
      .catch(error => next(error))
  })

  /*{
    title: 'blog3',
    author: 'jorma',
    url: 'blog3.fi',
    likes: 5
  }*/


module.exports = blogsRouter