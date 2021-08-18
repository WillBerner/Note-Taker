const express = require('express');
const tipsRouter = express.Router();

tipsRouter.get('/', (req, res) => {
    console.log(`${req.method} request received for feedback`);

});

tipsRouter.post('/', (req, res) => {
    console.log(req.body);

});

module.exports = tipsRouter;