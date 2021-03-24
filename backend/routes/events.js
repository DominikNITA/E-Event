const express = require('express');
const router = express.Router();

const Event = require("../models/Event");
const EventService = require("../services/EventService")

router.get('/', (req,res) => {
    res.json(EventService.getAll());
})

router.get('/:id', (req,res) => {
    res.json(EventService.getOne(req.params.id))
})

module.exports = router;