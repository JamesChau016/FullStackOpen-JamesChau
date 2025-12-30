const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const config = require('./utils/config')
const logger = require('./utils/logger')

const app = express()





mongoose.set('strictQuery',false)

logger.info('connecting to MongoDB')
mongoose.connect(config.url, { family: 4 })
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })



app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
  logger.info(`http://localhost:3003/api/blogs`)
})