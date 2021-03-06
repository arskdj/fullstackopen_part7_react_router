import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { initBlogs, addBlog, updateBlog, removeBlog } from './reducers/blogReducer'
import { initUsers, updateUser } from './reducers/usersReducer'
import { setNotification } from './reducers/notificationReducer'
import { logout, load } from './reducers/loginReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useRouteMatch, Link, Switch, Route }  from 'react-router-dom'

const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.login)
    const users = useSelector(state => state.users)
    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(initBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(initUsers())
    }, [dispatch])

    useEffect(() => {
        dispatch(load())
    }, [dispatch])


    const createBlog = async ({ title, url, author }) => {
        const updated = await blogService.postBlog({ title, url, author }, user.token)
        if (updated.blog.error){
            dispatch(setNotification('!e' + updated.blog.error))
        }else{
            blogFormRef.current.toggleVisibility()
            dispatch(addBlog(updated.blog))
            dispatch(setNotification(`blog added "${updated.blog.title}" by "${updated.blog.author}"`))
            dispatch(updateUser(updated.user))
        }
    }

    const likeHandler = async (blog) => {
        console.log('app.js',blog)
        const updatedBlog =  await blogService.likeBlog(blog)
        if (updatedBlog.error){
            dispatch(setNotification('!e'+updatedBlog.error))
        } else {
            dispatch(updateBlog(updatedBlog))
            console.log('updatedBlog', updatedBlog)
        }
    }

    const deleteBlog = async (blog) => {
        console.log('app.js',blog)
        const removed = await blogService.deleteBlog(blog.id, user.token)
        console.log(removed)
        if (removed.blog.error){
            dispatch(setNotification('!e'+removed.blog.error))
        } else {
            dispatch(setNotification(`${removed.blog.title} deleted`))
            dispatch(removeBlog(removed.blog.id))
            dispatch(updateUser(removed.user))
        }
    }

    const handleLogout = () => {
        dispatch(logout(user))
        dispatch(setNotification(`bye ${user.name}`))
    }

    const commentHandler = async (blog_id, comment) => {
        const blog = await blogService.postComment(blog_id, comment)
        dispatch(updateBlog(blog))
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

    const HomePage = () => (
        <div>
            <Notification />

            {user && showLoggedInMsg()}
            {user && showBlogForm()}
            {!user && showLoginForm()}

            <h2>blogs</h2>
            <div id='blogList'>
                {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
                    <Blog key={blog.id} blog={blog} deleteBlog= {deleteBlog} user= {user}/>
                )}
            </div>
        </div>
    )

    const NavBar = () => {
        const style = {
            padding : 10
        }

        return (
            <div >
                <Link style={style} to='/'> blogs </Link>
                <Link style={style} to='/users'> users </Link>
            </div>
        )
    }

     const userMatch = useRouteMatch('/users/:id')
    const userView = userMatch
        ? users.find(user=> user.id === userMatch.params.id)
        : null

     const blogMatch = useRouteMatch('/blogs/:id')
    const blogView = blogMatch
        ? blogs.find(blog=> blog.id === blogMatch.params.id)
        : null


    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path='/users/:id'>
                    <UserView user={userView}/>
                </Route>
                <Route path='/users'>
                    <Users users= {users}/>
                </Route>
                <Route path='/blogs/:id'>
                    <BlogView blog={blogView} likeHandler= {likeHandler} commentHandler= {commentHandler}/>
                </Route>
                <Route path='/'>
                    <HomePage/>
                </Route>
            </Switch>
        </div>
    )
}

export default App
