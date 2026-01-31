import axios from "axios";
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const createNew = (newContact) => {
    return axios.post(baseUrl,newContact).then(response => response.data)
}

const deleteContact = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data.id)
}

const changeNumber = (id,newContact) => {
    return axios.put(`${baseUrl}/${id}`,newContact).then(response=>response.data)
}
export default {getAll,createNew,deleteContact,changeNumber}