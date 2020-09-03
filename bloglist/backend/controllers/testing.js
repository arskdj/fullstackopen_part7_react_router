const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const h = require('../tests/helper')

const initUsers = async () => {
    await User.deleteMany({})
    const users = h.initialUsers.map(u=> new User(u))
    let promises = await users.map(u => u.save())
    await Promise.all(promises)
}

const initBlogs = async () => {
    await Blog.deleteMany({})
    const blogs = h.initialBlogs.map(b => new Blog(b))
    promises = await blogs.map(b => b.save())
    await Promise.all(promises)
}

router.post('/reset', async (request, response) => {
    await initBlogs()
    await initUsers()

    response.status(204).end()
})

module.exports = router
