const loginRouter = require('express').Router()
const auth = require('../utils/auth')
require('express-async-errors')

loginRouter.post('/', async (req,res) => {
    console.log('login', req.body)
    const token = await auth.login(req.body.username, req.body.password)

    console.log(token)
    res.status(201).json({token})

})

module.exports = loginRouter
