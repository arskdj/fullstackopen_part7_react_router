import loginService from '../services/login.js'
import {setNotification} from '../reducers/notificationReducer'

const userReducer = (state=[], action) => {
    switch (action.type){
    case 'LOGIN':
    case 'LOGOUT':
    case 'LOAD':
        return action.data.user
    default: return state
    }
}

export const login = ({ username, password }) => {
    return async dispatch => {
        const user = await loginService.login({ username, password })
        if (user.error) {
            dispatch(setNotification('!e' + user.error))
        }else{
            window.localStorage.setItem('user', JSON.stringify(user))
        }

        dispatch({
            type : 'LOGIN',
            data : { user }
        })
    }
}


export const logout = (user) => {
    return async dispatch => {
        window.localStorage.removeItem('user')
        setNotification(`bye ${user.name}`)
        dispatch({
            type : 'LOGOUT',
            data : { user:null }
        })
    }
}


export const load = (user) => {
    return async dispatch => {
        const storage = window.localStorage.getItem('user')
        const user = storage
            ? JSON.parse(user)
            : null
        dispatch({
            type : 'LOAD',
            data : { user }
        })
    }
}

export default userReducer
