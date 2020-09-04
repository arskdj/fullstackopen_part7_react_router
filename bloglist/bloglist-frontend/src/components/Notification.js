import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {

    const notification = useSelector(state => state.notification)
    if (!notification.message) return null

    const style = {
        color: notification.color,
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }


    return (
        <div id="notification" style={style} >
            <p>{notification.message}</p>
        </div>
    )
}

export default Notification
