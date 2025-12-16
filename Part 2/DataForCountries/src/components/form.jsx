import {useState, useEffect} from 'react'


const Form = ({list, setCountries}) =>{
    const [key, setKey] = useState('')
    const handleInput = (e) =>{
        const tKey = e.target.value.toLowerCase()  
        setKey(tKey) 
    }
    useEffect(()=>{
        const temp=list.filter(country => 
          ((country.name.common.toLowerCase().includes(key))||(country.name.official.toLowerCase().includes(key))))
        setCountries(temp)
        console.log(list)
      },[key])

    return(
        <>
            <div>
                find countries <input onChange={handleInput}/>
            </div>
        </>
    )
}

export default Form