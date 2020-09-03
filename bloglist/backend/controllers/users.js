const usersRouter = require('express').Router()
const User = require('../models/user.js')
const auth = require('../utils/auth')
require('express-async-errors')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', {
        title : 1,
        author : 1,
        url : 1,
    })

    res.status(200).json(users) 
})

usersRouter.post('/', async (req, res) => {
    const user = await auth.register(req.body)

    res.status(201).json(user)

})

module.exports = usersRouter
