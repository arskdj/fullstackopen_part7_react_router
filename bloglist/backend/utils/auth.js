const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
require('express-async-errors')

const decryptToken = async (token) => {
    let payload = null

    try {
        payload = await jwt.verify(token, config.SECRET)
    } catch (error) {
        throw new Error('InvalidToken')
    }

    return payload
}

const getAuthUser = async (token) => {
    if (!token){
        throw new Error('NoToken')
    }

    const payload = await decryptToken(token)
    const user = await User.findById(payload.id)

    if (!user){
        throw new Error('User404')
    }

    return user
}

const login = async (username, password) => {
    const user = await User.findOne({ username : username })

    if (!user){
        throw new Error('User404')
    }

    const correctPassword = await bcrypt.compare(password, user.password)

    if (!correctPassword){
        throw new Error('WrongPassword')
    }

    const payload = {
        username : user.username,
        id : user.id
    }

    const token = await jwt.sign(payload, config.SECRET)
    return { token, name: user.name, username: user.username}
}


const register = async (user) => {
    const plen = user.password.length

    if (plen < 3){
        throw new Error('ShortPass')
    }

    const saltRounds = 15
    const passHash = await bcrypt.hash(user.password, saltRounds)

    const registeredUser = User({...user, password : passHash})
    await registeredUser.save()

    return  user
}

module.exports = { login, register, getAuthUser, decryptToken }
