import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const addName = (e) =>{
    const obj={name:newName}
    e.preventDefault()
    if (persons.find(o=>o.name===newName)){
      window.alert(`${newName} is already added to the phonebook`)
    }
    else{
      setPersons(p => p.concat(obj))
    }
    
  }

  const handleChange = (e) =>{
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
        {/* <div>debug: {newName}</div> */}
      </form>
      <h2>Numbers</h2>
      {persons.map((n,i)=><div key={i}>{n.name}</div>)}
    </div>
  )
}

export default App