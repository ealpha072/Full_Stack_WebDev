const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
app.use(cors())

app.use(express.json())
app.use(express.static('build'))
//MONGO CREDS
//username = alpha
//pass  = eJbF0SW0qNg5tA5U
const Note = require('./models/note')

//DEFINE MIDDLEWARE

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
    Note.find({}).then(notes=>{
        response.json(notes)
    })
})

app.post('/api/notes', (request, response)=>{
    const body = request.body

    if(body.content === undefined){
        response.status(404).json({error:'Content missing'})
    }
    const note = new Note({
        content : body.content,
        important: body.important || false,
        date : new Date().toISOString,
    })
    
    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.delete('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error:'Unkown endpoint'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})