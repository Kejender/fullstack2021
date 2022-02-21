import axios from 'axios'
const baseUrl = '/api/login'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const login = (credentials) => {
  console.log('loginservice', credentials)
  const request = axios.post(baseUrl, credentials)
  return request.then(response => response.data)
}

export default { getAll: getAll, login: login }