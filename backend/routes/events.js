const express = require('express');
const router = express.Router();

const Event = require("../models/Event");
const EventService = require("../services/EventService")

router.get('/', (req,res) => {
    res.json(EventService.getAllEvents());
})

router.post('/', (req,res) => {
    if(req.body.event == null){
        res.statusCode = 400;
        res.statusMessage = "No event passed";
        res.end();
        return;
    }
    res.json(EventService.addEvent(req.body.event))
})

router.get('/:id', (req,res) => {
    res.json(EventService.getOneEvent(req.params.id));
})

module.exports = router;