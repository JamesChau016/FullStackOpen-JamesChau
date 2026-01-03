const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { usersInDb } = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in db', async () => {
    beforeEach(async () => {
        await User.deleteMany({})
        
        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({
            username: 'James',
            passwordHash
        })

        await user.save()
    })

    test('create new user with unique username', async () => {
        const userList = await usersInDb()

        const newUser = {
            username: 'Saul Goodman',
            name: 'Jimmy McGill',
            password: 'JMM'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const userListAfter = await usersInDb()

        const usernames = userListAfter.map(u => u.username)

        assert.strictEqual(userListAfter.length, userList.length + 1)
        assert(usernames.includes(newUser.username))
    })

    test('username must be unique when create', async () => {
        const userList = await usersInDb()

        const newUserSameName = {
            username: 'James',
            name: 'Jimmy',
            password: 'jim'
        }

        const result = await api
            .post('/api/users')
            .send(newUserSameName)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const userListAfter = await usersInDb()

        assert(result.body.error.includes('expected `username` to be unique'))
        assert.strictEqual(userList.length, userListAfter.length)
    })

    test('username and password must be at least 3 characters', async () => {
        const userList = await usersInDb()

        const invalidUsername = {
            username: 'A',
            name: 'Aaron',
            password: 'ADMIN'
        }

        const invalidPassword = {
            username: 'Aaron',
            name: 'Jesse',
            password: 'Yo'
        }

        const resultUsername = await api
            .post('/api/users')
            .send(invalidUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        

        assert(resultUsername.body.error.includes('username must be atleast 3 characters'))

        const resultPassword = await api
            .post('/api/users')
            .send(invalidPassword)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        
        assert(resultPassword.body.error.includes('password must be atleast 3 characters'))

        const userListAfter = await usersInDb()
        assert.strictEqual(userList.length, userListAfter.length)
    })

    test('missing username or password', async () => {
        const userList = await usersInDb()

        const invalidUser = {
            name: 'Jesse'
        }

        const result = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        assert(result.body.error.includes('please enter your username and password'))

        const userListAfter = await usersInDb()
        assert.strictEqual(userList.length, userListAfter.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})
