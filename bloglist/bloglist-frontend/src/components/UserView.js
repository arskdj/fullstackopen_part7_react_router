import React, {useState} from "react"

const UserView = ({user}) => {
    if (!user) return null
    return(
        <div>
            <h2> { user.name } </h2>
            <h4>  added blogs </h4>
            <ul>
                { (!user.blogs || user.blogs.length === 0) && (<p> no blogs found for this user</p>) }
                { user.blogs.map( blog => 
                    <li key={blog.id}> {blog.title} </li>
                )}
            </ul>
        </div>
    )
}

export default UserView
