const Header = (props) => {
  return (
    <>
      <p>Course name: {props.course}</p>
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





const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const Content = () => {
    return(
      <>
        <Part part={part1} exercises={exercises1}/>
        <Part part={part2} exercises={exercises2}/>
        <Part part={part3} exercises={exercises3}/>
      </>
    )
  }

  return (
    <>
      <Header course={course}/>
      <Content/>
      <Total/>
    </>
  )
}

export default App