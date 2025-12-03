import { useState } from 'react'
import Filter from './components/filter'
import Form from './components/form'
import Person from './components/person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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