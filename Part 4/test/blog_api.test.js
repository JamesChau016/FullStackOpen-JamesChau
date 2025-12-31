const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')


const api = supertest(app)

const initialBlogs = [
    {
        "title" : "Test blog 1",
        "author" : "James",
        "url" : "abc.com",
        "likes" : "7"
    },
    {
        "title" : "Test blog 2",
        "author" : "James",
        "url" : "abc.com",
        "likes" : "123"
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  after(async () => {
    await mongoose.connection.close()
  })


test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
})