import {useState} from 'react'
import services from '../services/persons'


const Person = ({persons, setPersons}) =>{
    const handleDelete = (person) =>{
        if (window.confirm(`Delete ${person.name}?`)){
            services.deleteP(person.id)
            .then(()=>{setPersons(p=>p.filter(per => per!=person))})
        }
    }

    return(
        <>
            {persons.map((n)=>
                <div key={n.id}>
                    {n.name} {n.number} &nbsp;
                    <button onClick={()=>handleDelete(n)}>delete</button>
                </div>
            )}
        </>
    )
}



export default Person