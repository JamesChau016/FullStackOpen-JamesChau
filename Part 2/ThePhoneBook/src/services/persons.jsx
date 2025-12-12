
import axios from 'axios'


const url = "http://localhost:3001/persons"

const getAll = ()=>{
    return axios.get(url)
}

const add = (obj)=>{
    return axios.post(url,obj)
}


export default {getAll, add}