// dependencies
const path = require('path');
const fs = require('fs');
const db = require('../db/db.json');
let unique = require('unique')

module.exports = (app) => {
    // GET notes should read the db.json file and return all saved notes as JSON
    app.get('notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });

    // POST notes will receive a new note to save on request body and add it to the db.json file
    app.post('api/notes', (req, res) => {
        db = JSON.parse(db);
        res.JSON(db);
        // creates body for note
        let userNote = {
            title: req.body.title,
            text: req.body.text,
            // unique id for notes
            id: unique(),
        };
        // push created note to be written in the db.json
        db.push(userNote);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.json(db)
    });

    // delete notes should receive query containing id of the note to delete
    app.delete('api/notes/:id', (req, res) => {
        // reads notes from db.json
        let db = JSON.parse(fs.readFileSync('./db/db.json'))
        // removes note with unique id
        let oldNotes = db.filter(item => item.id !== req.params.id);
        // updates note in db.json
        fs.writeFileSync('./db/db.json', JSON.stringify(oldNotes));
        res.json(oldNotes);
    })
};