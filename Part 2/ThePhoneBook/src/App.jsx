import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [char, setChar] = useState('')


  const addName = (e) =>{
    const obj={name:newName, number: newNum}
    e.preventDefault()
    if (persons.find(o=>o.name===newName)){
      window.alert(`${newName} is already added to the phonebook`)
    }
    else{
      setPersons(p => p.concat(obj))
    }
  }

  const handleChangeName = (e) =>{
    setNewName(e.target.value)
  }

  const handleChangeNum = (e) =>{
    setNewNum(e.target.value)
  }

  const handleFilter = (e) =>{
    setChar(e.target.value)
    setPersons(p=> p.filter(person => person.name.includes(char)))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with<input onChange={handleFilter}/>
        </div>
      </form>
      <h3>add a new</h3>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleChangeName}/>
        </div>
        <div>
          number: <input onChange={handleChangeNum}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
        {/* <div>debug: {newName}</div> */}
      </form>
      <h2>Numbers</h2>
      {persons.map((n,i)=><div key={i}>{n.name} {n.number}</div>)}
    </div>
  )
}

export default App