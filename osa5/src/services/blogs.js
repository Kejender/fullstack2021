import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  console.log('create blog', token)
  const config = {
    headers: { Authorization: token },
  }

  console.log('new blog', newBlog, config)

  const response = axios.post(baseUrl, newBlog, config)
  return response.then(response => response.data)
}

/**
  const create = async newObject => {
  const config = {
    headers: { Authorization: token },
}
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
 */

const update = async newBlog => {
  console.log('update', newBlog)
  const request = axios.put(baseUrl+'/'+newBlog.id, newBlog)
  return request.then(response => response.data)
}

const deleteB = async deleteBlog => {
  console.log('blog to delete', deleteBlog)
  const deleteConfirm = window.confirm(`Delete ${deleteBlog.title}?`)
  console.log(deleteConfirm)
  if (deleteConfirm){
    const config = {
      headers: { authorization: token },
    }
    console.log('config, config')
    const request = axios.delete(baseUrl+'/'+deleteBlog.id, config)
    return request.then(response => response.data)
  }
}

export default { getAll: getAll, create: create, update: update, setToken: setToken, deleteB: deleteB }