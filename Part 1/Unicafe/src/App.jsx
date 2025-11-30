import { useState } from 'react'

const StatisticLine = (props) => {
  return(
        <tr>
          <td>{props.text}&ensp;</td>
          <td>{props.value} {props.text==='positive' ? '%' : '' }</td>
        </tr>
    

    
      
  )
}

const Buttons = (props) => {
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const all = good+bad+neutral
  const avr = (good-bad)/all
  const pos = (good/all)*100
  if (all===0){
    return(
      <>No feedback given</>
    )
  }
  else{
    return(
      <>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={avr}/>
          <StatisticLine text="positive" value={pos}/>
        </tbody>
      </table>
      </>
    )
  }
}
const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () =>{
    const newGood = good+1
    setGood(newGood)
  }

  const handleNeutral = () =>{
    const newNeu = neutral+1
    setNeutral(newNeu)
  }
  const handleBad = () =>{
    const newBad = bad+1
    setBad(newBad)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Buttons onClick={handleGood} text='good'/>
      <Buttons onClick={handleNeutral} text='neutral'/>
      <Buttons onClick={handleBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App