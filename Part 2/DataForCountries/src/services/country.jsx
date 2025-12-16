
import axios from 'axios'


const url = "https://studies.cs.helsinki.fi/restcountries/api/name"

const get = (name)=>{
    return axios.get(`${url}/${name}`)
}

const getAll = () =>{
    return axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
}

export default {get, getAll}