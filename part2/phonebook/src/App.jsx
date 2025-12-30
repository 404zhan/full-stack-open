import { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const personsToShow = filterName === '' ? persons : persons.filter(x => x.name.toLowerCase().includes(filterName.toLowerCase()))
  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeNum = (event) => {
    setNewNumber(event.target.value)
  }
  const handleChangeFilter = (event) => {
    setFilterName(event.target.value)
  }
  const handleClick = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)){
      alert(`${newName} already exists`)
      return
    }
    const newPerson = {
      name: newName,
      id: String(persons.length+1),
      number: newNumber
    }
    console.log(newPerson)
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value = {filterName} onChange={handleChangeFilter}/>
      <Form valname = {newName} onChangeNam = {handleChangeName} valnum = {newNumber} onChangeNum = {handleChangeNum} onClick = {handleClick}/>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => 
          <Person person = {person} key = {person.id}/>
        )}
      </ul>
    </div>
  )
}

export default App