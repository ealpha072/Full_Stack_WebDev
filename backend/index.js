const express = require('express')
const app = express()
const cors = require('cors')

//MONGO CREDS
//username = alpha
//pass  = eJbF0SW0qNg5tA5U
app.use(cors())

app.use(express.json())
app.use(express.static('build'))

let notes = [
    {
        "id": 1,
        "content": "HTML is easy",
        "date": "2022-1-17T17:30:31.098Z",
        "important": false
    },
    {
        "id": 2,
        "content": "Browser can execute only JavaScript",
        "date": "2022-1-17T18:39:34.091Z",
        "important": false
    },
    {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "date": "2022-1-17T19:20:14.298Z",
        "important": true
    }
]

const generateId = () =>{
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    return maxId + 1
}

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id);
    const note = notes.find(note => note.id === id)
    
    if(note){
        response.json(note)
    }else{
        response.status(404).end()
    }
})

app.get('/api/notes', (request, response)=>{
    response.json(notes)
})

app.post('/api/notes', (request, response)=>{
    const body = request.body
    if(!body.content){
        response.status(404).json({
            error:'Content missing'
        })
    }
    const note = {
        content : body.content,
        important: body.important || false,
        date : new Date().toISOString,
        id:generateId()
    }
    notes = notes.concat(note)
    response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error:'Unkown endpoint'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})