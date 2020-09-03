const _ = require('lodash')

const dummy = (blogs) => { // eslint-disable-line
    return 1
}

const totalLikes = (blogs) => { 
    const reducer = (sum, blog) => { 
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => { 
    const maxReducer = (max, blog, index) => { 
        return blogs[max].likes < blog.likes ? index : max
    }
    
    const max_index = blogs.reduce(maxReducer, 0) 
    return blogs[max_index]
}

const mostBlogs = ( blogs ) => {
    return _.chain(blogs)
        .countBy('author')
        .map((v,k) => {
            return { author: k, blogs : v }
        })
        .maxBy('blogs')
        .value()
}

const mostLikes = (blogs) => {
    return  _.chain(blogs)
        .groupBy('author')
        .map( (blogList, author) => {
            return { author : author, likes : _.sumBy(blogList, (b) => b.likes) }
        })
        .maxBy('likes')
        .value()
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}
