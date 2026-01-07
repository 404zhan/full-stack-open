import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/Notes'
import './index.css'

const App = () => {
  const [note, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [showError, setShowError] = useState('some error occured....')

  useEffect(() => {
    noteService.getAll().then(initialNotes => {setNotes(initialNotes)})
  }, [])

  console.log(`render ${note.length} notes`)

  const addNotes = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random()<0.5,
    }
    noteService.create(noteObject)
    .then(resdata => {
      setNotes(note.concat(resdata))
      setNewNote('')
    })
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const notesToShow = showAll ? note : note.filter(x => x.important)

  const toggleImportanceOf = (id) => {
    const noteToBeChanged = note.find(n => n.id === id)
    const changedNote = {...noteToBeChanged, important: !noteToBeChanged.important }
    noteService.update(id, changedNote)
    .then(resdata => {
      setNotes(note.map(n => n.id === id ? resdata:n)) 
    })
    .catch(error => {
      setShowError(
          `Note '${noteToBeChanged.content}' was already removed from server`
        )
      setTimeout(() => {
          setShowError(null)
        }, 5000)
      setNotes(note.filter(n => n.id !== id))
    })
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message = {showError}/>
      <div>
        <button onClick = {() => setShowAll(!showAll)}>
          show {showAll?'important':'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNotes}>
        <input value = {newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App 