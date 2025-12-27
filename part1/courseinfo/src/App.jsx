import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}
const Button = ({handleClick, text}) => {
  return (
    <button onClick = {handleClick}>{text}</button>
  )
}
const Statistics = (props) => {
  const total = props.good+props.neutral+props.bad
  if (total == 0){
    return (
      <p>No feedback given</p>
    )
  }
  const average = (props.good-props.bad)/total
  const positive = props.good/total
  return (
    <div>
      <StatisticLine text = "good" value = {props.good}/>
      <StatisticLine text = "bad" value = {props.bad}/>
      <StatisticLine text = "neutral" value = {props.neutral}/>
      <StatisticLine text = "average" value = {average}/>
      <StatisticLine text = "positive" value = {positive + '%'}/>
    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {() => setGood(good+1)} text = "good"/>
      <Button handleClick = {() => setNeutral(neutral+1)} text = "neutral"/>
      <Button handleClick = {() => setBad(bad+1)} text = "bad"/>
      <Statistics good = {good} bad = {bad} neutral = {neutral}/>
    </div>
  )
}

export default App