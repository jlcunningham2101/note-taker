const router = require("express").Router();
const path = require("path");
const fs = require("fs");
var uniqid = require("uniqid");

//API route for GET request//
router.get("/api/notes", function (req, res) {
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(notes);
});

//API route for POST request//
router.post("/api/notes", function (req, res) {
  let createNote = req.body;
  createNote.id = uniqid();

  let newNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  newNote.push(createNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(newNote));
  res.json(createNote);
});

//API route to DELETE a request//
router.delete("/api/notes/:id", function (req, res) {
  const deletedId = parseInt(req.params.id);
  readFileAsync("./db/db.json", "utf8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      console.log(notes);
      const newNotes = [];
      for (let i = 0; i < notes.length; i++) {
        if (deletedId !== notes[i].id) {
          newNotes.push(notes[i]);
        }
      }
      return newNotes;
    })
    .then(function (notes) {
      writeFileAsync("./db/db.json", JSON.stringify(notes));
      res.send("Your notes have been saved");
    })
    .catch(function (err) {
      console.log(err);
    });
});

module.exports = router;
