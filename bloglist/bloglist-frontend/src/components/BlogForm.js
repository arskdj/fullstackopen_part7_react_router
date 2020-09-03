import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('newtitle')
  const [url, setUrl] = useState('newurl')
  const [author, setAuthor] = useState('newauthor')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, url, author })
  }

  return (
    <div>
      <form onSubmit={addBlog} >
        <div> title
          <input id='blog-title' onChange={({ target }) => setTitle(target.value) } />
        </div>
        <div> url
          <input id='blog-url' onChange={({ target }) => setUrl(target.value) } />
        </div>
        <div> author
          <input id='blog-author' onChange={({ target }) => setAuthor(target.value) } />
        </div>
        <button type="submit"> submit </button>
      </form>
    </div>
  )

}
export default BlogForm
