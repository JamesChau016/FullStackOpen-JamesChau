
import axios from 'axios'


const url = "http://localhost:3001/persons"

const getAll = ()=>{
    return axios.get(url)
}

const add = (obj)=>{
    return axios.post(url,obj)
}

const deleteP = (id) =>{
    return axios.delete(`${url}/${id}`)
}

const change = (id, changedPerson) =>{
    const newUrl = `${url}/${id}`
    return axios.put(newUrl,changedPerson)
}


export default {getAll, add, deleteP, change}