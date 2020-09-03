const tokenExtractor = (req, res, next) => {

    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    }else{
        req.token = null
    }


    next()
}
const errorHandler = (error, req, res, next) => {
    console.log(error.message)

    if (error.name === 'ValidationError') {
        return res.status(400).send({error: 'username too short'})
    }

    if (error.message == 'User404' ){
        return res.status(404).json({ error : 'user not found' })
    }

    if (error.message == 'WrongPassword' ){
        return res.status(400).json({ error : 'wrong password' })
    }

    if (error.message == 'ShortPass' ){
        return res.status(400).json({ error : 'password too short' })
    }

    if (error.message == 'InvalidToken' ){
        return res.status(401).json({error:'invalid token'})
    }

    if (error.message == 'NoToken' ){
        return res.status(401).json({error:'token missing'})
    }

    next(error)
}

module.exports = {
    errorHandler,
    tokenExtractor
}
