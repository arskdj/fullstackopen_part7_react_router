import React  from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = ({users}) => {
    return(
        <div>
            <table>
            {
                users.map(user => (<tr key={user.id}>
                    <td> <Link to={'/users/' + user.id}> {user.name} </Link> </td>
                    <td> {user.blogs.length} </td>
                </tr>))
            }
            </table>
        </div>
    )
}

export default Users
