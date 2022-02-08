const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  console.log("req", request)
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
      console.log("token found in middleware", request.token)
      next()
      return authorization.substring(7)
    }
    next()
}

const userExtractor = async (request, response, next) => {
  console.log("req", request.body)

  if (request.token) {
    console.log("token found", request.token)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (decodedToken.id) {
        console.log("id found")
        const user = await User.findById(decodedToken.id)
        console.log("user", user)
        request.user = user
      }
  } else {
      console.log("no token")
    }
  next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({
        error: 'malformatted id'
      })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({
        error: error.message 
      })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'it is an invalid token'
      })
    }
  
    logger.error(error.message)
  
    next(error)
  }

  module.exports = {
    requestLogger,
    tokenExtractor,
    userExtractor,
    unknownEndpoint,
    errorHandler
  }