import {useState,useEffect} from 'react'
import axios from 'axios'
import services from '../services/persons'

const Form = ({persons, setPersons}) =>{

    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')

    const addName = (e) =>{
        const obj={name:newName, number: newNum}
        const per = persons.find(o => o.name===newName)
        e.preventDefault()
        if (per){
          if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
            const newPer = {...per, number: newNum}
            services.change(newPer.id, newPer)
            .then(response => {
                setPersons(persons.map(p=>p.id === newPer.id ? response.data : p))
            })
          }
        }
        else if ((newName==='')||(newNum==='')){
            window.alert('Please enter all values')
        }
        else{
            services.add(obj)
            .then(response=>{
                setPersons(p => p.concat(response.data))
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