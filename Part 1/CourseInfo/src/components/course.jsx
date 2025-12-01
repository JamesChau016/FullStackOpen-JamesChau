const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => {
    
    const arr = props.parts
    return(
        arr.map((part,i) => <Part key={i} part={part}/>)
    )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p><strong>total of {props.total} exercises</strong></p>

const Course = (props) =>{
    const course=props.course
    let total=0
    course.parts.forEach(part =>{
        total+=part.exercises
    })
    return (
        <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total total={total}/>
        </div>
      )
}

export default  Course