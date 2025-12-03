

const Person = ({persons}) =>{

    return(
        <>
            {persons.map((n,i)=><div key={i}>{n.name} {n.number}</div>)}
        </>
    )
}



export default Person