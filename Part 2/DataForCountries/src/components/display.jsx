import services from '../services/country'


const Display = ({countries}) =>{
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
                        {c.name.common}
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