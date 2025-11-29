const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>Course name: {props.course}</h1>
    </>
  )
  
}
const Part = (props) => {
  return(
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}


const Total = () => {
  return(
    <></>
  )
}

const Content = (props) => {
    const parts=props.parts
    return(
      <>
        {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
      
      </>
      
    )
    

}




const App = () => {
  const course = 'Half Stack application development'
  const parts = [{
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }]


  return (
    <>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total/>
    </>
  )
}

export default App