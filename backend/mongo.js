const mongoose = require('mongoose')

// mongodb+srv://alpha:<password>@cluster0.rypdi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//MONGO CREDS
//username = alpha0
//pass  = ewerdvdv>bbcvbvb/eJbF0S/</W0qNg5tA5U*ghfgjghyuiyum,jkl
if(process.argv.length < 3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password  = process.argv[2]

const url = `mongodb+srv://alpha:${password}@cluster0.rypdi.mongodb.net/noteApp?retryWrites=true&w=majority`
console.log(url)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is Easy',
    date: new Date(),
    important: true,
})
  
note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})