import { useState,useEffect } from 'react'
import Filter from './components/filter'
import Form from './components/form'
import Person from './components/person'
import axios from 'axios'
import services from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(()=>{
    services.getAll()
    .then(r=>setPersons(r.data))
    console.log('Completed fetching data')
  },[])
  

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter setPersons={setPersons}/>

      <h3>add a new</h3>

      <Form persons={persons} setPersons={setPersons}/>

      <h3>Numbers</h3>
      
      <Person persons={persons}/>
    </div>
  )
}

export default App