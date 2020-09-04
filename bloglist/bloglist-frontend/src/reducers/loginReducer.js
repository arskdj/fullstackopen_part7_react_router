const loginReducer = (state=null, action) => {
    switch (action.type){
    case 'LOGIN':
    case 'LOGOUT':
    case 'LOAD':
        return action.data.user
    default: return state
    }
}

export const login = (user) => {
    return async dispatch => {
        window.localStorage.setItem('user', JSON.stringify(user))

        dispatch({
            type : 'LOGIN',
            data : { user }
        })
    }
}


export const logout = (user) => {
    window.localStorage.removeItem('user')
    return dispatch => {
        dispatch({
            type : 'LOGOUT',
            data : { user: null }
        })
    }
}


export const load = () => {
    return dispatch => {
        const storage = window.localStorage.getItem('user')
        const user = storage
            ? JSON.parse(storage)
            : null

        dispatch({
            type : 'LOAD',
            data : { user }
        })
    }
}

export default loginReducer
