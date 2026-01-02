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


test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('check unique identifier', async () => {
    const response = await api.get('/api/blogs')
    assert('id' in response.body[0])
    assert.strictEqual(response.body[0]._id, undefined)
})

test('add a new blog', async () => {
    const newBlog = {
        "title" : "newBlog",
        "author" : "random",
        "url" : "abc.com",
        "likes" : "9"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    const titles = response.body.map(blog => blog.title)

    assert.strictEqual(response.body.length, initialBlogs.length +1)

    assert(titles.includes('newBlog'))
})

test('default to 0 when likes property is undefined', async () => {
    const blogWithNoLikes = {
        "title" : "new blog with no likes",
        "author" : "Chuck",
        "url" : "youtube.com"
    }

    await api
        .post('/api/blogs')
        .send(blogWithNoLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')

    const newBlog = response.body.find(blog => blog.title === "new blog with no likes")

    assert.strictEqual(newBlog.likes, 0)
})

test('if blog\'s title or url is missing', async () => {
    const blogWithoutTitle = {
        "author" : "Chuck",
        "url" : "youtube.com",
        "likes" : "9"
    }

    const blogWithoutUrl = {
        "title" : "no url",
        "author" : "Jimmy",
        "likes" : "1216"
    }

    await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .expect(400)
    
    await api
        .post('/api/blogs')
        .send(blogWithoutUrl)
        .expect(400)
    
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('delete a blog', async () => {
    const blogsList = await api.get('/api/blogs')
    const firstBlogId = blogsList.body[0].id

    await api
        .delete(`/api/blogs/${firstBlogId}`)
        .expect(204)
    
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length-1)
})


after(async () => {
    await mongoose.connection.close()
})