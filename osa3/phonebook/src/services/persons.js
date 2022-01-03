import axios from 'axios'
//const baseUrl = 'https://arcane-shelf-21967.herokuapp.com/api/persons'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    console.log("getall")
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}