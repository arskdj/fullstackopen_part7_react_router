import React, {useState} from "react"

const BlogView = ({likeHandler, blog}) => {
    if (!blog) return null

    return(
        <div>
            <h2> {blog.title} </h2>
            <h3> <em> {blog.author} </em> </h3>
            <a id="url" href={blog.url}> {blog.url} </a>
            <p>
                <span className="likes">  { blog.likes } </span>
                <button className="likeButton" onClick={async ()=> { await likeHandler(blog)}}> like </button>
            </p>
            {blog.user && <p> added by { blog.user.name } </p>}
        </div>
        )
}

export default BlogView
