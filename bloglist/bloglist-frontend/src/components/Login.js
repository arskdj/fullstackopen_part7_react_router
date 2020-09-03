import React, { useState, useEffect } from 'react'
import {login} from '../reducers/userReducer'
import {setNotification} from '../reducers/notificationReducer'
import {useSelector, useDispatch} from 'react-redux'
import loginService from '../services/login.js'

const Login = () => {

    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector(state => state.user)

    const handleLogin = async (event) => {
        event.preventDefault()
        const response = await loginService.login({ username, password })
        if (response.error) {
            dispatch(setNotification('!e' + response.error))
        }else{
            dispatch(login(response))
        }
    }


    return (
        <div>
            <form onSubmit={handleLogin}>
                <div> username
                    <input id="username" name="username" value={username} onChange={({ target }) => setUsername(target.value)}/>
                </div>
                <div> password
                    <input id="password" name="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
                </div>
                <button id="login-button" type="submit"> login </button>
            </form>
        </div>
    )
}

export default Login
