// dependencies
const router = require("express").Router();
const uuid = require("../helpers/uuid");

const {
  readFromFile,
  readAndAppend,
} = require("../helpers/fsUtils");


// get route for notes
router.get("/notes", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
  }
);
// post route for notes
router.post("/notes", (req, res) => {
  // receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

  // destructuring for the items in the req.body
  const { title, text } = req.body;
// for the object to be saved
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error: Title and Text fields are required");
  }
});


module.exports = router;
