const express = require('express');
const router = express.Router();
const Event = require("../models/Event");

router.get('/', (req,res) => {
    res.send("All events");
})

router.get('/:id', (req,res) => {
    //TODO: get data from DB
    res.json({
        id: req.params.id,
        name: "Test Event",
        availablePlaces: 2,
        startDate: Date.now(),
        price: 0
    })
})

module.exports = router;