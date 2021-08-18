const express = require('express');
const fs = require('fs');


const tipsRouter = express.Router();

const notes = require('../db/db.json');

tipsRouter.get('/', (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        
        if (err) {
            console.log(err);
        } else {
            res.send(JSON.parse(data));
        }
    })

});

tipsRouter.post('/', (req, res) => {

    let currentNotes = null;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        
        if (err) {

          console.error(err);

        } else {
            currentNotes = JSON.parse(data);

            currentNotes.push({ "title": req.body.title, "text": req.body.text});

            fs.writeFile("./db/db.json", JSON.stringify(currentNotes), (err) => {
                
                if (err) {

                    console.log(err)
                
                } else {

                    console.log("Note Added.");
                    res.status(200).send(currentNotes);

                }
            });
        }
    });
});

module.exports = tipsRouter;