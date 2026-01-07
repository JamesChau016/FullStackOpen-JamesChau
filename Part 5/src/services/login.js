import axios from 'axios'
const url = '/api/login'

const login = async creds => {
  const response = await axios.post(url, creds)
  return response.data
}

export default { login }