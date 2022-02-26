const express = require('express')
const app = express()
/*
"scripts": {
    "start": "react-scripts start",
    "dev": "nodemon index.js",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "server": "json-server -p3001 --watch db.json"
  } */
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

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id);
    const note = notes.find(note => note.id === id)
    
    if(note){
        response.json(note)
    }else{
        response.status(404).end()
    }
})

app.delete('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})
  
const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})