import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const avr = (good-bad)/all
  const pos = (good/all)*100

  const handleGood = () =>{
    const newGood = good+1
    setGood(newGood)
    setAll(newGood+bad+neutral)
  }

  const handleNeutral = () =>{
    const newNeu = neutral+1
    setNeutral(newNeu)
    setAll(good+bad+newNeu)
  }
  const handleBad = () =>{
    const newBad = bad+1
    setBad(newBad)
    setAll(good+newBad+neutral)
  }




  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h2>statistics</h2>
      <p>good {good} <br/>
         neutral {neutral} <br/>
         bad {bad}<br/>
         all {all}<br/>
         average {avr}<br/>
         positive {pos} %
      </p>
    </div>
  )
}

export default App