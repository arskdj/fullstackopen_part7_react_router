import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = async () => {
  let res = null
  try {
    res = await axios.get(baseUrl)
  }catch(error){
    throw error.response.data
  }

  return res.data
}

export default { getUsers }
