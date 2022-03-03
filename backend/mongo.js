const mongoose = require('mongoose')

//username = alpha0
//pass  = eJbF0SW0qNg5tA5U
if(process.argv.length < 3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password  = process.argv[2]

const url = `mongodb+srv://alpha:<pass>@cluster0.rypdi.mongodb.net/noteApp?retryWrites=true&w=majority`
console.log(url)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)



const note = new Note({
    content: 'To give is to get',
    date: new Date(),
    important: true,
})
  
note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})

Note.find({}).then(response=>{
    response.forEach(note=>{
        console.log(note)
    })
    mongoose.connection.close()
})