import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')


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

  return (
    <div>
      <h2>Phonebook</h2>
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