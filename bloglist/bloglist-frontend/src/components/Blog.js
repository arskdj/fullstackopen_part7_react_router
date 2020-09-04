import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Blog = ({ blog, deleteBlog, user }) => {

    const blogStyle = {
        paddingLeft: 5,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const deleteHandler = async () => {
        window.confirm(`Are you sure you want to delete ${blog.title} ?`) &&
            await deleteBlog(blog)
    }

    const showDeleteButton = () => {
        return  (<button onClick={deleteHandler}> delete </button>)
    }

    return (
        <div style={blogStyle}>
            <Link to={'/blogs/'+blog.id} id="title"> {`${blog.title} || ${blog.author} ||`}</Link>
            {user && blog.user &&  user.id === blog.user.id && showDeleteButton()}
        </div>
    )
}

export default Blog
