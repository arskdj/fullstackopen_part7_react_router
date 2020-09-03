const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/user')
const db = require('../utils/db.js')
const h = require('./helper')
require('express-async-errors')

beforeAll( async () => {
    await db.connect()
})

beforeEach( async () => {
    await User.deleteMany({})
    const users = h.initialUsers.map(u=> new User(u))
    const promises = await users.map(u => u.save())
    await Promise.all(promises)
})

afterAll( async () => {
    await db.close()
})


describe('users', () => {
    const url = '/api/users/'

    test('get users url', async () => {
        const response = await api.get(url)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(4)
    })

    test('register user', async () => {
        const user = {
            'name' : 'testUser',
            'username' : 'sometest',
            'password' : '1234'
        }

        const response = await api.post(url)
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const {name, username} = response.body
        delete user.password
        expect(user).toEqual({name, username})

        const allUsers = await h.getAllUsers()
        expect(allUsers).toHaveLength(h.initialUsers.length + 1)
    })


    test('register invalid password', async () => {
        const user = {
            'name' : 'invalid_password',
            'username' : 'invalidUser',
            'password' : '12'
        }

        await api.post(url)
            .send(user)
            .expect(400)
            .expect({error: 'password too short'})

        const userInDb = await User.find({name:user.name})
        expect(userInDb).toEqual([])
    })

    test('register invalid username', async () => {
        const user = {
            'name' : 'invalid_username',
            'username' : 'n',
            'password' : '1234'
        }

        await api.post(url)
            .send(user)
            .expect(400)
            .expect({error: 'username too short'})

        const userInDb = await User.find({name:user.name})
        expect(userInDb).toEqual([])
    })
})

describe('auth', () => {
    const url = '/api/login'
    const password = '1234'

    test('user login', async () => {
        const {username} = h.initialUsers[0]

        const res = await api.post(url)
            .send({ username, password })
            .expect(201)

        console.log(res.body)
    })

    test('login wrong username', async () => {
        const user = {
            'username' : 'notfound',
            password
        }

        await api.post(url)
            .send(user)
            .expect(404)
            .expect({error: 'user not found'})
    })

    test('login wrong password', async () => {
        const user = {
            'username' : 'some1',
            'password' : 'wrongpass'
        }

        await api.post(url)
            .send(user)
            .expect(400)
            .expect({error: 'wrong password'})
    })


    test('post authorized blog', async () => {
        const {username} = h.initialUsers[0]
        const res = await api.post(url)
            .send({ username, password })
            .expect(201)

        const token = res.body.token.token

        const blog = {
            title: 'auth title',
            author : 'auth author',
            url : 'auth url',
            likes : 123556,
            user : token.id
        }
        await api.post('/api/blogs')
            .send(blog)

    })
})
