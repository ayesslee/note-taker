const path = require('path');

// route
module.exports = function(app) {
    // GET notes returns the notes.html file
    app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '../public/notes.html'))
);

    // GET * returns the index.html file
    app.get('*', (req, res) => 
        res.sendFile(path.join(__dirname, '../public/index.html'))
    )
};