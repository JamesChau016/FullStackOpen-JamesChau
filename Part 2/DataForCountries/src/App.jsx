import { useState, useEffect } from 'react'
import axios from 'axios'
import services from './services/country'
import Display from './components/display'
import Form from './components/form'

const App = () =>{
  const [countries, setCountries] = useState([])
  const [list, setList] = useState([])

  useEffect(()=>{
    services.getAll()
    .then(r=>{setList(r.data)
      setCountries(list)
    })
  },[])


  

  return(
    <>
      <Form setCountries={setCountries} list={list}/>
      <Display countries={countries}/>
    </>
  )
}

export default App
