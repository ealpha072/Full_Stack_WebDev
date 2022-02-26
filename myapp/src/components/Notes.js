const Note = ({ note, toggleImportance }) => {
	const label = note.important ? 'Mark as not Important' : 'Mark important'
	return(
		<li>
			{note.content}
			<button onClick={toggleImportance}>{label}</button>
		</li>
	)
}

export default Note