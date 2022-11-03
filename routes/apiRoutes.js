// dependencies
const path = require('path');
const fs = require('fs');



module.exports = (app) => {
    // GET notes should read the db.json file and return all saved notes as JSON
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });

    app.get('/api/notes/:id'), (req, res) => {
        let olderNotes = JSON.parse(fs.readFileSync('../db/db.json', 'utf-8'));
        res.json(olderNotes[Number(req.params.id)]);
    }

    // POST notes will receive a new note to save on request body and add it to the db.json file
    app.post('api/notes', (req, res) => {
        let db = fs.readFileSync('db/db.json');
        let olderNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
        let newerNote = {
            title: req.body.title,
            text: req.body.text,
            id: uniqueId(),
        };
        let unique = (olderNotes.length).toString();
       newerNote.id = uniqueNote;
       olderNotes.push(newerNote);
       fs.writeFileSync('./db/db.json', JSON.stringify(olderNotes));
       console.log('Data saved to db.json file: ', newerNote);
       res.json(olderNotes);
    });


    // delete notes should receive query containing id of the note to delete
    app.delete('api/notes/:id', (req, res) => {
        let db = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
        let deleteNotes = db.filter(item => item.id !== req.params.id);
        fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
        res.json(deleteNotes);

    })
};