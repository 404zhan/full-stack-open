import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [note, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState(
    'a new note ...'
  )
  const [showAll, setShowAll] = useState(true)
  const addNotes = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random()<0.5,
      id: String(note.length+1)
    }
    setNotes(note.concat(noteObject))
    setNewNote('')
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const notesToShow = showAll ? note : note.filter(x => x.important)
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick = {() => setShowAll(!showAll)}>
          show {showAll?'important':'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNotes}>
        <input value = {newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App 