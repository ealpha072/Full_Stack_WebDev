import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'
import Note from './components/Notes'

const App = () => {
	const [notes, setNotes] = useState([])
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)

	useEffect(() => {
		noteService
			.getAll()
			.then(initiallNotes => {
				setNotes(initiallNotes)
			})
		}, [])

	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
		content: newNote,
		date: new Date().toISOString(),
		important: Math.random() > 0.5,
		}
		noteService
			.create(noteObject)
			.then(returnedNotes=>{
				setNotes(notes.concat(returnedNotes))
				setNewNote(' ')
		})
	}

	const handleNoteChange = (event) => {
		setNewNote(event.target.value)
	}

	const notesToShow = showAll ? notes : notes.filter(note => note.important)

	 const toggleImportanceOf = (id) => {
			const note = notes.find(n => n.id === id)
			console.log(note);
			const changedNote = {...note, important:!note.important}
			console.log(typeof(id));
			axios.put(`http://localhost:3001/api/notes/${id}`, changedNote).then(response=>{
				console.log('Sent to server')
			})
			/*noteService
				.update(id, changedNote).then(returnedNotes=>{
					setNotes(notes.map(note => note.id !== id ? note : returnedNotes ))
				})*/
	}
	return (
		<div>
			<h1>Notes</h1>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
				show {showAll ? 'important' : 'all' }
				</button>
			</div>   
			<ul>
				{notesToShow.map(note => 
					<Note 
						key={note.id} 
						note={note} 
						toggleImportance={()=> toggleImportanceOf(note.id)} 
					/>
				)}
			</ul>
				<form onSubmit={addNote}>
					<input
					value={newNote}
					onChange={handleNoteChange}
					/>
					<button type="submit">save</button>
				</form>
		</div>
	)
}

export default App
