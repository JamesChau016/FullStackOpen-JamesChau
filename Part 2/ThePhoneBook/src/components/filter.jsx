import {useState} from 'react'

const Filter = ({setPersons})=>{
    const [char, setChar] = useState('')

    const handleFilter = (e)=>{
        setChar(e.target.value)
        setPersons(p=> p.filter(person => person.name.includes(char)))
    }

    return(
        <>
            <form>
                <div>
                    filter shown with<input onChange={handleFilter}/>
                </div>
            </form>
        </>  
    )
}



export default Filter