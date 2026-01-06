import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Form from './components/Form'
import contactService from './services/Person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  
  useEffect(() => {
    contactService.getAll().then(initialData => setPersons(initialData))
  }, [])

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
      if(window.confirm(`${newName} already exists in the phonebook, you wanna replace that?`)){
        const contactToReplace = persons.find(p => p.name === newName)
        const changedContact = {...contactToReplace, number: newNumber}
        contactService.update(contactToReplace.id, changedContact)
        .then(changedNumber => {
          setPersons(persons.map(x => x.id === contactToReplace.id ? changedNumber : x))
        })
      }
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    contactService.create(newPerson).then(newContact => {
      setPersons(persons.concat(newContact))
      setNewName('')
      setNewNumber('')
    })
  }
  
  const deleteContactId = (id) => {
    const guy = persons.find(n => n.id === id)
    if (window.confirm(`Do you want to remove ${guy.name}?`)){
      contactService.del(id).then(() => {
      setPersons(persons.filter(p => p.id !== id))
    })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value = {filterName} onChange={handleChangeFilter}/>
      <h2>Add new one</h2>
      <Form valname = {newName} onChangeNam = {handleChangeName} valnum = {newNumber} onChangeNum = {handleChangeNum} onClick = {handleClick}/>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => 
          <Person person = {person} key = {person.id} delContact = {() => {deleteContactId(person.id)}}/>
        )}
      </ul>
    </div>
  )
}

export default App