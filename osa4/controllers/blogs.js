const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

/*const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log("loytyy")
    return authorization.substring(7)
  }
  return null
}*/

blogsRouter.get('/', async (request, response) => {
  logger.info("getting blogs")
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
});

  blogsRouter.post('/', async (request, response, next) => {
    console.log("post")
    const body = request.body
    console.log("request user", request.user)
    console.log("body", body)
    //const decodedToken = jwt.verify(token, process.env.SECRET)
    //const decodedToken = jwt.verify(request.token, process.env.SECRET)
    //if (!token || !decodedToken.id) {
    //if (!request.token || !decodedToken.id) {
    //  console.log("ei toimi")
    //  return response.status(401).json({ error: 'token missing or invalid' })
    //}
    //const user = await User.findById(decodedToken.id)

    console.log("blog user", request.user)
    const user = request.user
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    if (!blog.title && !blog.url) {
      console.log("no title or url")
      response.status(400).send({error: 'missing info'})
    }
    else {
    if (!request.body.likes) {
      blog.likes = 0
    }

    const savedBlog = await blog.save()
    console.log("savedblog", savedBlog)
    console.log("user", user)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(200).end()
    }
  })

  blogsRouter.delete('/:id', async (request, response) => {
    const body = request.body
    const blog = await Blog.findById(request.params.id)
    console.log("blog", blog.user.toString(), request.user._id)
    //if (body.id === blog.user.toString()) {
    if (request.user._id.toString() === blog.user.toString()) {
      console.log("same users")
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      console.log("ei")
      return response.status(401).json({ error: 'not found' })
    }

    //await Blog.findByIdAndRemove(request.params.id)
    //response.status(204).end()
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

module.exports = blogsRouter