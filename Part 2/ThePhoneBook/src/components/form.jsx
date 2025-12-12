import {useState,useEffect} from 'react'
import axios from 'axios'

const Form = ({persons, setPersons}) =>{

    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')

    const addName = (e) =>{
        const obj={name:newName, number: newNum}
        e.preventDefault()
        if (persons.find(o=>o.name===newName)){
          window.alert(`${newName} is already added to the phonebook`)
        }
        else{
            axios.post("http://localhost:3001/persons",obj)
            .then(()=>{
                setPersons(p => p.concat(obj))
                console.log('completed adding')
            })
        }
      }
    
    const handleChangeName = (e) =>{
        setNewName(e.target.value)
    }
    
    const handleChangeNum = (e) =>{
        setNewNum(e.target.value)
    }

    return(
        <>
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
            </form>
        </>
    )
}



export default Form