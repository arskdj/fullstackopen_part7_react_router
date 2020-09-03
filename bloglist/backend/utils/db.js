const mongoose = require('mongoose')
const config = require('../utils/config')

const settings = {
    'useFindAndModify':    false,
    'useCreateIndex':      true,
    'useNewUrlParser':     true,
    'useUnifiedTopology':  true
}

const connect = async () => {
    try{
        await mongoose.connect(config.DB_URI, settings)
        console.log('connected to DB', config.DB_URI)
    }
    catch (error){
        console.log('couldnt connect to DB', error)
    }
}

const close = async () => {
    try{
        await mongoose.connection.close()
        console.log('DB connection closed', config.DB_URI)
    }
    catch (error){
        console.log('couldnt close DB connection', error)
    }
}

module.exports = {connect, close}
