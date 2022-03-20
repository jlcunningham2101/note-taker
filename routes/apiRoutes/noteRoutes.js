const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const util = require("util");
var uniqid = require("uniqid");

//To manage asynchronous processes//
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//API route for GET request//
router.get("/api/notes", function (req, res) {
  readFileAsync("./db/db.json", "utf8").then(function (data) {
    notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});

//API route for POST request//
router.post("/api/notes", function (req, res) {
  const note = req.body;
  readFileAsync("./db/db.json", "utf8")
    .then(function (data) {
      const notes = [].concat(JSON.parse(data));
      note.id = uniqid();
      notes.push(note);
      return notes;
    })
    .then(function (notes) {
      writeFileAsync("./db/db.json", JSON.stringify(notes));
      res.json(notes);
    });
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
