const express = require('express');
const router = express.Router();

const Event = require("../models/Event");
const EventService = require("../services/EventService")

router.get('/', async (req,res) => {
    res.json(await EventService.getAllEvents());
})

router.post('/', async (req,res) => {
    if(req.body.event == null){
        res.statusCode = 400;
        res.statusMessage = "No event passed";
        res.end();
        return;
    }
    const event = await EventService.addEvent(req.body.event);
    res.json(event);
})

router.get('/:id', async (req,res) => {
    const event = await EventService.getOneEvent(req.params.id);
    if(event == null){
        res.statusCode = 400;
        res.statusMessage = "Invalid event id";
        res.end();
        return;
    }
    else{
        res.json(event);
    }
})

router.delete('/:id', async (req,res) => {
    await EventService.removeEvent(req.params.id);
    res.status(200).end();
})

module.exports = router;