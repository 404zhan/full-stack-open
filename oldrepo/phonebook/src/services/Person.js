import axios from 'axios'
const baseUrl = "http://localhost:3001/api/persons"

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newObj => {
    return axios.post(baseUrl, newObj).then(response => response.data)
}

const update = (id, changedObj) => {
    return axios.put(`${baseUrl}/${id}`, changedObj).then(response => response.data)
}

const del = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

export default {getAll, create, update, del}