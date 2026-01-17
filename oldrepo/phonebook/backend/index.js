const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

let contacts = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    const maxId = Math.max(...contacts.map(p => Number(p.id)))
    return String(Math.ceil(Math.random()*(maxId+1)*10))
}

app.get('/api/persons', (request, response) => {
    response.json(contacts)
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(
        `Phonebook has info of ${contacts.length} people<br>${date}`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = contacts.find(p => id === p.id)
    if(person){
        return response.json(person)
    }
    response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    contacts = contacts.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const present = contacts.find(p => p.name == body.name)

    if(!body.name || !body.number || present){
        return response.status(400).json({error: 'content missing or not unique'})
    }
    const person = {
        id : generateId(),
        name : body.name,
        number : body.number
    }
    contacts = contacts.concat(person)
    response.json(contacts)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})