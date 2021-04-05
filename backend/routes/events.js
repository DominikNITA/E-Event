const express = require('express');
const router = express.Router();

const Event = require("../models/Event");
const EventService = require("../services/EventService")


/** 
    @swagger
    tags:
        name: Events
        description: API to manage your events. 
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      Event:
 *          type: object
 *          required:
 *              - name
 *              - availablePlaces
 *          properties:
 *              name:
 *                  type: string
 *                  description: Name of event
 *              availablePlaces:
 *                  type: integer
 *                  description: Available places count 
 */

/**
 * 
 * @swagger
 * /events/:
 *   get:
 *     tags: [Events]
 *     summary: Get all events
 *     responses:
 *       200:
 *         description: Returns all events
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Event'
 */
router.get('/', async (req,res) => {
    res.json(await EventService.getAllEvents());
})

/**
 * @swagger
 * /events/:
 *  post:
 *      tags: [Events]
 *      summary: Creates a new event
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Event'
 */
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