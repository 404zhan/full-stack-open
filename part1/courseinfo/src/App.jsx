import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
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
      <table>
        <tbody>
          <StatisticLine text = "good" value = {props.good}/>
          <StatisticLine text = "bad" value = {props.bad}/>
          <StatisticLine text = "neutral" value = {props.neutral}/>
          <StatisticLine text = "average" value = {average}/>
          <StatisticLine text = "positive" value = {positive + '%'}/>
        </tbody>
      </table>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleVote = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {() => setGood(good+1)} text = "good"/>
      <Button handleClick = {() => setNeutral(neutral+1)} text = "neutral"/>
      <Button handleClick = {() => setBad(bad+1)} text = "bad"/>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button handleClick = {() => setSelected(Math.floor(Math.random()*anecdotes.length))} text = "next anecdote"/>
      <Button handleClick={handleVote} text = "vote"/>
      <h2>Anecdote with largest number of votes</h2>
      <p>{anecdotes[vote.indexOf(Math.max(...vote))]} with {Math.max(...vote)}</p>
      <Statistics good = {good} bad = {bad} neutral = {neutral}/>
    </div>
  )
}

export default App