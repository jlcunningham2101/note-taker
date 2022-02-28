//Dependencies needed//
const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
var uniqid = require('uniqid'); 


//To manage asynchronous processes//
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//Server setup//
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//To use middleware//
app.use(express.static('public'));

//API route for GET request//
app.get('/api/notes', function(req, res) {
    readFileAsync('./db/db.json', 'utf8').then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
})
});

//API route for POST request//
app.post('/api/notes', function(req, res) {
    const note = req.body;
    readFileAsync('./db/db.json', 'utf8').then(function(data){
        const notes =[].concat(JSON.parse(data));
        note.id = uniqid()
        notes.push(note);
        return notes
    })
    .then(function(notes) {
writeFileAsync('./db/db.json', JSON.stringify(notes))
res.json(notes);
    })
});

//API route to DELETE a request//
app.delete('/api/notes/:id', function(req, res) {
const deletedId = parseInt(req.params.id);
readFileAsync('./db/db.json', 'utf8')
.then(function(data) {
    const notes = [].concat(JSON.parse(data));
    console.log(notes)
    const newNotes = []
    for (let i = 0; i<notes.length; i++) {
        if(deletedId !==notes[i].id) {
            newNotes.push(notes[i])
        }
    }
    return newNotes
})
.then(function(notes) {
    writeFileAsync('./db/db.json', JSON.stringify(notes))
    res.send('Your notes have been saved');
})
.catch(function(err){
console.log(err)
})
})

//HTML routing for notes//
app.get('/notes', function(req,res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//HTML routing for wildcard//
app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//get the server to listen//
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});