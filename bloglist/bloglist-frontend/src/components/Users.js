import React  from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
    const users = useSelector(state => state.users)
    return(
        <div>
            <table>
            {
                users.map(user => (<tr key={user.id}>
                    <td> {user.name} </td>
                    <td> {user.blogs.length} </td>
                </tr>))
            }
            </table>
        </div>
    )
}

export default Users
