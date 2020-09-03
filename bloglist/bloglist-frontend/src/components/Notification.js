import React from 'react'


const Notification = ({ msg }) => {
  const style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (msg===null) return null

  if (msg.startsWith('!e')) {
    style.color = 'red'
    msg = msg.substr(2)
  }


  return (
    <div id="notification" style={style} >
      <p>{msg}</p>
    </div>
  )
}

export default Notification
