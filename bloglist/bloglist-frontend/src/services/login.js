import axios from 'axios'
const baseUrl = '/api/login'

const login = async ({ username, password }) => {
  let res = null
  try {
    res = await axios.post(baseUrl, { username, password })
  }catch(error){
    return error.response.data
  }

  return res.data.token
}

export default { login }
