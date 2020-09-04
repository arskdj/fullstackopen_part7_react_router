const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const auth = require('../utils/auth')
require('express-async-errors')

blogsRouter.get('/', async (req, res) => {
    const result = await Blog .find({}).populate('user', {
        name :1,
        username :1,
    })
    res.json(result)
})

blogsRouter.post('/', async (req, res) => {
    const user = await auth.getAuthUser(req.token)

    const blog = new Blog(req.body)
    blog.user = user._id

    await blog.save()
    const newBlog = await Blog .findById(blog._id).populate('user', {
        name :1,
        username :1,
    })

    user.blogs.push(newBlog._id)

    const updatedUser = await User.findByIdAndUpdate(user.id, user, {new:true}).populate('blogs', {
        title : 1, 
        author : 1,
        url :1,
        likes :1
    })

    const result = {
        blog : newBlog,
        user : updatedUser
    }


    res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
    const blogId = req.params.id
    const tokenUser = await auth.getAuthUser(req.token)
    const blog = await Blog.findById(blogId)

    if (blog.user && tokenUser._id.toString() === blog.user.toString()){
        const deletedBlog = await Blog.findByIdAndDelete(blogId)
        if (deletedBlog){
            const user = await User.findById(blog.user.toString())

            const filteredBlogs = user.blogs.filter(
                blog => blog.toString() !== deletedBlog._id.toString()
            )

            user.blogs = filteredBlogs
            console.log('filteredBlogs',filteredBlogs)

            const updatedUser = await User.findByIdAndUpdate(blog.user, user, {new:true}).populate('blogs', {
                title : 1, 
                author : 1,
                url :1,
                likes :1
            })

            const result = {
                user: updatedUser,
                blog : deletedBlog,
            }

            res.status(200).json(result)
        }
        else
            res.status(404).end()
    }else{
        res.status(401).json({error: 'user not allowed to delete'})
    }
})

blogsRouter.put('/:id', async (req, res) => {
    const newBlog = req.body
    const opts = {
        new : true, 
        runValidators : true,
        context: 'query'
    }

    const result = await Blog.findByIdAndUpdate(req.params.id, newBlog, opts).populate('user', {
        name :1,
        username :1,
    })

    res.status(200).json(result)
})

blogsRouter.post('/:id/comments', async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('user', {
        name :1,
        username :1,
    })

    blog.comments.push(req.body.comment)
    await blog.save()


    res.status(201).json(blog)
})

module.exports = blogsRouter
