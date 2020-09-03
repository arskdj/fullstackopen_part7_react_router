import axios from 'axios'
const baseUrl = '/api/blogs/'

const getAll = async () => {
  let res = null
  try {
    res = await axios.get(baseUrl)
  }catch(error){
    res = error.response
  }
  return res.data
}


const postBlog = async ({ title, url, author }, token) => {

  const config = {
    headers: { Authorization: `bearer ${token}` },
  }

  let res = null
  try{
    res = await axios.post(baseUrl, { title, url, author }, config )
  }catch(error){
    res = error.response
  }

  return res.data
}

const likeBlog = async (blog) => {
  console.log('blog', blog)

  let newBlog = { ...blog }
  newBlog.likes = blog.likes + 1
  if (newBlog.user)
    newBlog.user = blog.user.id

  console.log('newBlog', newBlog)

  let res = null
  try{
    res = await axios.put(baseUrl+newBlog.id, newBlog )
  }catch(error){
    res = error.response
  }

  console.log('likeblog:updated', res.data)
  return res.data
}

const deleteBlog = async (id, token) => {

  const config = {
    headers: { Authorization: `bearer ${token}` },
  }

  let res = null
  try{
    res = await axios.delete(baseUrl+id, config )
  }catch(error){
    res = error.response
  }

  return res.data
}
export default { getAll, postBlog, likeBlog, deleteBlog }
