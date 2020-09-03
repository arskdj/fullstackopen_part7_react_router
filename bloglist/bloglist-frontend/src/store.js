import {applyMiddleware, createStore, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({
    user : userReducer,
    blogs : blogReducer,
    notification : notificationReducer
})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))

export default store
