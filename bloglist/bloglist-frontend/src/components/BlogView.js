import React, {useState} from "react"

const BlogView = ({commentHandler, likeHandler, blog}) => {
    const [comment, setComment] = useState('')
    console.log(comment)
    
    const handleChange = (event) => {
        event.preventDefault()
        setComment(event.target.value)
    }

    if (!blog) return null

    return(
        <div>
            <h1> {blog.title} </h1>
            <p> <em> {blog.author} </em> </p>
            <a id="url" href={blog.url}> {blog.url} </a>
            <p>
                <span className="likes">  { blog.likes } </span>
                <button className="likeButton" onClick={async ()=> { await likeHandler(blog)}}> like </button>
            </p>
            {blog.user && <p> added by { blog.user.name } </p>}

            <h3> comments </h3>
            <div>
                <input onChange={handleChange}/>
                <button onClick={()=> commentHandler(blog.id,{comment})}> add </button>
                <ul>
                    { blog.comments && blog.comments.map( comment => <li key={comment}> {comment} </li> ) }
                </ul>
            </div>
        </div>
        )
}

export default BlogView
