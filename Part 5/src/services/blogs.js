import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blogInfo) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blogInfo, config)
  return response.data
}

const change = async (id, blogInfo) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, blogInfo)
  return response.data
}

const deleteBlog = async (id) => {
  const url = `${baseUrl}/${id}`
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, create, setToken, change, deleteBlog }