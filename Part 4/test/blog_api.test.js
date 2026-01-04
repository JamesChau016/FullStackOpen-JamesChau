const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, blogsInDb } = require('./test_helper')


const api = supertest(app)

let token = ''

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
    await User.deleteMany({})
    await api
        .post('/api/users')
        .send({
            "username" : "Kim",
            "password" : "kmm"
        })
        .expect(201)
    const result = await api
        .post('/api/login')
        .send({
            "username" : "Kim",
            "password" : "kmm"
        })
        .expect(200)
    token = result.body.token
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


test('all blogs are returned', async () => {
    const response = await blogsInDb()
    assert.strictEqual(response.length, initialBlogs.length)
})

test('check unique identifier', async () => {
    const response = await blogsInDb()
    assert('id' in response[0])
    assert.strictEqual(response[0]._id, undefined)
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
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const listAfter = await blogsInDb()
    const titles = listAfter.map(blog => blog.title)

    assert.strictEqual(listAfter.length, initialBlogs.length +1)

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
        .set('Authorization', `Bearer ${token}`)
        .send(blogWithNoLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await blogsInDb()

    const newBlog = response.find(blog => blog.title === "new blog with no likes")

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
        .set('Authorization', `Bearer ${token}`)
        .send(blogWithoutTitle)
        .expect(400)
    
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blogWithoutUrl)
        .expect(400)
    
    const response = await blogsInDb()

    assert.strictEqual(response.length, initialBlogs.length)
})

test('delete a blog', async () => {
    const blogsList = await blogsInDb()
    const firstBlogId = blogsList[0].id.toString()
    console.log(firstBlogId)

    await api
        .delete(`/api/blogs/${firstBlogId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
    
    const response = await blogsInDb()
    assert.strictEqual(response.length, initialBlogs.length-1)
})

test('change contents of existing blogs', async () => {
    const changedFirstBlog = {
        "likes" : 68
    }

    const blogsList = await blogsInDb()
    const firstBlogId = blogsList[0].id

    await api
        .put(`/api/blogs/${firstBlogId}`)
        .send(changedFirstBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await Blog.findById(firstBlogId)
    assert.strictEqual(changedFirstBlog.likes, response.likes)
})


after(async () => {
    await mongoose.connection.close()
})