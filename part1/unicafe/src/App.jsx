import { useState } from 'react'

const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button> 


const StatisticsLine = ({text,value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Stat = ({good,neutral,bad}) => {
  let sum = (good * 1) + ( bad*(-1))
  let total = good + neutral + bad

  if (total === 0) {
    return(
      <>
      <h1>Statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }

  return (
  <>
  <h1>Statistics</h1>
  <table>
  <tbody>
  <StatisticsLine text="Good" value={good}/>
  <StatisticsLine text="Neutral" value={neutral}/>
  <StatisticsLine text="Bad" value={bad}/>
  <StatisticsLine text="All" value={total}/>
  <StatisticsLine text="Average" value={sum/total}/>
  <StatisticsLine text="Positive" value={good*100/total}/>
  </tbody>
  </table>
  </>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick= {()=> setGood(good + 1)} text="Good"/>
      <Button onClick= {()=> setNeutral(neutral + 1)} text="Neutral"/>
      <Button onClick= {()=> setBad(bad + 1)} text="Bad"/>
      <Stat good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App