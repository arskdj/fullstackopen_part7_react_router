const notificationReducer = (state='', action) => {
    switch (action.type){
    case 'NOTIFY':
    return action.data.message
    default : return state
    }
}

export const setNotification = (message) => {
    return dispatch => {
        dispatch({
            type : 'NOTIFY',
            data : { message }
        })
    }
}

export default notificationReducer
