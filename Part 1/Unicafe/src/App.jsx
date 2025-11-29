import { useState } from 'react'



const Statistics = ({good, bad, neutral}) => {
  const all = good+bad+neutral
  const avr = (good-bad)/all
  const pos = (good/all)*100
  if (all===0){
    return(
      <p>No feedback given</p>
    )
  }
  else{
    return(
      <>
        <h2>Statistics</h2>
        <p>good {good} <br/>
           neutral {neutral} <br/>
           bad {bad}<br/>
           all {all}<br/>
           average {avr}<br/>
           positive {pos} %
        </p>
  
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
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Statistics good={good} bad={bad} neutral={neutral}/>
      
    </div>
  )
}

export default App