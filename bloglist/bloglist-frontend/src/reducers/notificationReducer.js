let tid = null

const notificationReducer = (state=null, action) => {
    switch (action.type){
    case 'NOTIFY':
    return action.data
    default : return state
    }
}

export const setNotification = (message) => {
    return dispatch => {

            let color = 'green'

        if (message.startsWith('!e')) {
            color = 'red'
            message = message.substr(2)
        }else{
        }

         const notify = (message) => {
            dispatch({
                type : 'NOTIFY',
                data : {
                    message,
                    color
                }
            })
        }

        const clear = () => {
            tid !== null && clearTimeout(tid)
            tid = setTimeout( () => {
                notify(null)
                tid = null
            }, 5 * 1000)
        }

        notify(message)
        clear()
    }
}

export default notificationReducer
