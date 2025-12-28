import {useState,useEffect} from 'react'
import axios from 'axios'
import services from '../services/persons'

const Form = ({persons, setPersons, setNoti, setErr}) =>{

    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')

    const addName = (e) =>{
        const per = persons.find(o => o.name===newName)
        e.preventDefault()
        if (per){
          if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
            const newPer = {...per, number: newNum}
            services.change(newPer.id, newPer)
            .then(response => {
                setPersons(persons.map(p=>p.id === newPer.id ? response.data : p))
                setNoti(`${newPer.name}'s number changed`)
                setTimeout(() => {
                    setNoti(null)
                }, 5000)
            })
            .catch(error =>{
                setErr(`Information of ${newPer.name} has already been removed from the server`)
                setTimeout(() => {
                    setErr(null)
                }, 5000)
            })
          }
        }
        else if ((newName==='')||(newNum==='')){
            window.alert('Please enter all values')
        }
        else{
            services.add({name:newName, number: newNum})
            .then(response=>{
                setPersons(p => p.concat(response.data))
                console.log(response)
                setNoti(`Added ${newName}`)
                setTimeout(() => {
                    setNoti(null)
                }, 5000)
            })
            .catch(error=>{
                const msg=error.response.data.error
                console.log(msg)
                setErr(msg)
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