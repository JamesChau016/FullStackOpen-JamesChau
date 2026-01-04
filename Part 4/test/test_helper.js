const Blog = require('../models/blog')
const User = require('../models/user')

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

const testUser = [
    {
        "username" : "Kim",
        "password" : "kmm"
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    testUser,
    blogsInDb,
    usersInDb
}