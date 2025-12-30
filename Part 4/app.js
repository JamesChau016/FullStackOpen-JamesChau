const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')

const app = express()
app.use(express.json())

app.use('/api/blogs', blogsRouter)



mongoose.set('strictQuery',false)

logger.info('connecting to MongoDB')
mongoose.connect(config.url, { family: 4 })
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

module.exports = app