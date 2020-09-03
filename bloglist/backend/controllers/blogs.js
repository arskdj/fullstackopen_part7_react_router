const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
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

    const result = await blog.save()
    res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
    const blogId = req.params.id
    const tokenUser = await auth.getAuthUser(req.token)
    const blog = await Blog.findById(blogId)

    if (blog.user && tokenUser._id.toString() === blog.user.toString()){
        const result = await Blog.findByIdAndDelete(blogId)
        if (result)
            res.status(200).json(result)
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

    const result = await Blog.findByIdAndUpdate(req.params.id, newBlog, opts)
    res.status(200).json(result)
})

module.exports = blogsRouter
