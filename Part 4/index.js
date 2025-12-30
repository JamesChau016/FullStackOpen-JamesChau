const express = require('express')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const config = require('./utils/config')

const app = express()





mongoose.set('strictQuery',false)

console.log('connecting to MongoDB')
mongoose.connect(config.url, { family: 4 })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
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
  console.log(`Server running on port ${config.PORT}`)
  console.log(`http://localhost:3003/api/blogs`)
})