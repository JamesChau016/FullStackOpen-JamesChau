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

    test('')
})

after(async () => {
    await mongoose.connection.close()
})
