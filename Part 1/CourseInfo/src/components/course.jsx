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

// const Total = (props) => <p>Number of exercises {props.total}</p>

const Course = (props) =>{
    const course=props.course
    return (
        <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          {/* <Total
            total={
              course.parts[0].exercises +
              course.parts[1].exercises +
              course.parts[2].exercises
            }
          /> */}
        </div>
      )
}

export default  Course