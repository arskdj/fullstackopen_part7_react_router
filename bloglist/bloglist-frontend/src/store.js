import {applyMiddleware, createStore, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({
    login : loginReducer,
    users : usersReducer,
    blogs : blogReducer,
    notification : notificationReducer

})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))

export default store
