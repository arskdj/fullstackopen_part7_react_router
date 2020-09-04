import usersService from '../services/users'
const usersReducer = (state=[], action) => {
    switch (action.type){
        case 'INIT_USERS':
            return action.data.users
        case 'UPDATE_USER': {
            const updatedUser = action.data.user
            return state.map( user => user.id === updatedUser.id
                ? updatedUser 
                : user)
        }
        default: return state
    }
}

export const initUsers = () => {
    return async dispatch => {
        let users = []
        try {
             users = await usersService.getUsers()
            dispatch({
                type: 'INIT_USERS',
                data : {users}
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateUser = (user) => {
    return async dispatch => {
        dispatch({
            type :'UPDATE_USER',
            data : { user }
        })
    } 
}

export default usersReducer
