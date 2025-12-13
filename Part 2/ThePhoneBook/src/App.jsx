import { useState,useEffect } from 'react'
import Filter from './components/filter'
import Form from './components/form'
import Person from './components/person'
import Notification from './components/noti'
import axios from 'axios'
import services from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [noti, setNoti] = useState(null)
  const [err, setErr] = useState(null)

  useEffect(()=>{
    services.getAll()
    .then(r=>setPersons(r.data))
  },[])
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messageS={noti} messageE={err}/>
      <Filter setPersons={setPersons}/>

      <h3>add a new</h3>

      <Form persons={persons} setPersons={setPersons} setNoti={setNoti} setErr={setErr}/>

      <h3>Numbers</h3>
      
      <Person persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App