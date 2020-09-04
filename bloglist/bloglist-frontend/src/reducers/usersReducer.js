const usersReducer = (state=[], action) => {
    switch (action.type){
        case 'INIT_USERS':
            return action.data.users
        default: return state
    }
}

export const initUsers = () => {
        
}

export default usersReducer
