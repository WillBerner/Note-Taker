// Router for /notes, the only route for this application

// Importing express
const express = require('express');

// Importing fs to write new info to my "database" json
const fs = require('fs');

// Importing unique ID generator function
const { v4: uuidv4 } = require('uuid');

// Create new router for '/notes'
const notesRouter = express.Router();

// Handle get reqeusts by sending back all notes
notesRouter.get('/', (req, res) => {

    // Read from my "database" json file to get current notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {

        if (err) {
            console.log(err);
        } else {

            // If everything's read correctly, send back the notes data
            res.send(JSON.parse(data));
        }
    });

});

// Handle post requests for creating new notes
notesRouter.post('/', (req, res) => {

    // Read from the "database" to get the current notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {

        if (err) {

            console.error(err);

        } else {

            // Get the array of notes data
            let currentNotes = JSON.parse(data);

            // Add a new note object using the given title and text input with a randomly generated ID
            currentNotes.push({
                "title": req.body.title,
                "text": req.body.text,
                "id": uuidv4()
            });

            // Write the new array of notes back to the "database" json
            fs.writeFile("./db/db.json", JSON.stringify(currentNotes), (err) => {

                if (err) {

                    console.log(err)

                } else {

                    // If successful, give a success message and respond with a success status message (200 OK)
                    console.log("Note Added.");
                    res.status(200).send(currentNotes);

                }
            });
        }
    });
});

// Handle delete requests for deleting notes
notesRouter.delete('/:id', (req, res) => {

    // Read from the "database" to get the current notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {

        if (err) {
            console.log(err);
        } else {

            // Get the unique id of the note to be deleted
            const noteID = req.params.id;

            // Remove that note from the array of notes
            const newNotes = JSON.parse(data).filter(note => note.id !== noteID);

            // Write the updated array of notes back to the "database"
            fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err) => {

                if (err) {

                    console.log(err)

                } else {

                    // If all goes well, respond with a success status (200 OK)
                    console.log("Note Deleted.");
                    res.status(200).send(newNotes);
                }
            });
        }
    })
});

// Export this router to be compiled in index router file
module.exports = notesRouter;