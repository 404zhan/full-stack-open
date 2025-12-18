const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>

      <Hello name = "AZHAN" age = {20+3}/>
      <Hello name = {name} age = {age}/>
    </div>
  )
}

export default App