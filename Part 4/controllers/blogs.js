const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')




blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      response.status(404).end()
    }
    response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  if(!blog.title){
    response.status(400).json({error: 'missing title'})
  }
  else if (!blog.url){
    response.status(400).json({error: 'missing url'})
  }
  else{
    if (!blog.likes){
      blog.likes=0
    }
    blog.user = user._id
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes} = request.body

  const blog = await Blog.findById(request.params.id)  
  if (!blog){
    response.status(404).end()
  }

  blog.title = title ? title : blog.title
  blog.author = author ? author : blog.author
  blog.url = url ? url : blog.url
  blog.likes = likes ? likes : blog.likes

  const changedBlog = await blog.save()
  response.json(changedBlog)
})

blogsRouter.delete('/:id', async (request, response) => { 
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter