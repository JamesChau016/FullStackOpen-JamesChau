import services from '../services/country'
import { useState } from 'react'


const Display = ({countries}) =>{
    const [toggle, setToggle] = useState(null)
    const handleShow = (id) =>{
        setToggle(id)
    }
    const handleHide = ()=>{
        setToggle(null)
    }

    const show = (country) =>{
        return(
            <>
                <h1>{country.name.common}</h1>
                <div>Capital {country.capital}</div><br/>
                <div>Area {country.area}</div><br/>
                <h3>Languages</h3>
                <ul>
                    {Object.values(country.languages).map((l,n) => <li key={n}>{l}</li>)}
                </ul>

                <img src={country.flags.png}/><br/>
                <button onClick={handleHide}>Hide</button>
            </>
        )
    }
    if (countries.length>10){
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if ((countries.length>1)&&(countries.length<=10)){
        return(
            <>
                {countries.map((c,n)=>
                    <div key={n}>
                        {(toggle===n ? show(c):
                        <>
                        {c.name.common}<button onClick={()=>handleShow(n)}>Show</button>
                        </>)} 
                    </div>
                )}
            </>
            
        )
    }
    else if (countries.length===1){
        const country = countries[0]
        return(
            <>
                <h1>{country.name.common}</h1>
                <div>Capital {country.capital}</div><br/>
                <div>Area {country.area}</div><br/>
                <h3>Languages</h3>
                <ul>
                    {Object.values(country.languages).map((l,n) => <li key={n}>{l}</li>)}
                </ul>

                <img src={country.flags.png}/>
                
            </>
        )
    }
}

export default Display