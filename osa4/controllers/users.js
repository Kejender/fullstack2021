const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
  .find({}).populate('blogs')
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  console.log("usr", body)

  if (body.username && body.name && body.username.length >= 3  && body.name.length >= 3) {
    console.log("yes")

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)

  } else {
    console.log("no")
    response.status(400).send({error: 'bad info'})
  }
})

module.exports = usersRouter