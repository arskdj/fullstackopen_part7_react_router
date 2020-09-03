import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { initBlogs, addBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { logout, load } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(initBlogs())
    }, [])

    useEffect(() => {
        dispatch(load())    
    }, [])


    const createBlog = async ({ title, url, author }) => {
        const blog = await blogService.postBlog({ title, url, author }, user.token)
        if (blog.error){
            dispatch(setNotification('!e' + blog.error))
        }else{
            blogFormRef.current.toggleVisibility()
            dispatch(addBlog(blog))
            dispatch(setNotification(`blog added "${blog.title}" by "${blog.author}"`))
        }
    }

    const likeBlog = async (blog) => {
        console.log('app.js',blog)
        const updatedBlog =  await blogService.likeBlog(blog)
        if (updatedBlog.error){
            setNotification('!e'+updatedBlog.error)
        } else {
            blog.likes = updatedBlog.likes
            return updatedBlog.likes
        }
    }

    const deleteBlog = async (blog) => {
        console.log('app.js',blog)
        const removed = await blogService.deleteBlog(blog.id, user.token)
        console.log(removed)
        if (removed.error){
            setNotification('!e'+removed.error)
        } else {
            setNotification(`${removed.title} deleted`)
        }
    }

    const handleLogout = () => {
        dispatch(logout(user))
        dispatch(setNotification(`bye ${user.name}`))
    }

    const showLoggedInMsg = () => (
        <div id='welcome'>
            Welcome {user.name} !
            <button onClick={handleLogout}> logout </button>
        </div>
    )

    const showLoginForm = () => (
        <div>
            <h2>login</h2>
            <Login />
        </div>
    )

    const showBlogForm = () => (
        <Togglable buttonName='add blog' ref={blogFormRef}>
            <h2> new blog details</h2>
            <BlogForm createBlog = {createBlog}/>
        </Togglable>
    )


    return (
        <div>
            <Notification />

            {user && showLoggedInMsg()}
            {user && showBlogForm()}
            {!user && showLoginForm()}

            <h2>blogs</h2>
            <div id='blogList'>
                {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
                <Blog key={blog.id} blog={blog} likeBlog= {likeBlog} deleteBlog= {deleteBlog} user= {user}/>
                )}
            </div>

        </div>
    )
}

export default App
