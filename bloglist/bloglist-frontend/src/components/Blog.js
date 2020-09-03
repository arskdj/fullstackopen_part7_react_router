import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, likeBlog, deleteBlog, user }) => {

    Blog.propTypes = {
        blog: PropTypes.object.isRequired,
        likeBlog : PropTypes.func,
        deleteBlog : PropTypes.func,
        user : PropTypes.object
    }

    const [likes, setLikes] = useState(blog.likes)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [show, setShow] = useState(false)
    const buttonName = show ? 'hide' : 'view'

    const toggleDetails = () => {
        setShow(!show)
    }

    const likeHandler = async () => {
        const likes = await likeBlog(blog)
        setLikes(likes)
    }

    const deleteHandler = async () => {
        window.confirm(`Are you sure you want to delete ${blog.title} ?`) &&
            await deleteBlog(blog)
    }

    const showDeleteButton = () => {
        return  (<button onClick={deleteHandler}> delete </button>)
    }

    const blogDetails = () => (
        <div>
            <p id="url"> { blog.url } </p>
            <p>
                <span className="likes">  { likes } </span> 
                <button className="likeButton" onClick={likeHandler}> like </button>
            </p>
        </div>
    )

    return (
        <div style={blogStyle}>
            <p id="title"> {`${blog.title} by ${blog.author}`}</p>
            <button className='showBlog' onClick={toggleDetails}> {buttonName} </button>
            {user && blog.user &&  user.username === blog.user.username && showDeleteButton()}
            {show && blogDetails()}
        </div>
    )
}

export default Blog
