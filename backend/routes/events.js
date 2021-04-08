const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const EventService = require("../services/EventService");

/** 
    @swagger
    tags:
        - name: Events
          description: API to manage your events. 
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      Event:
 *          type: object
 *          required:
 *              - id
 *              - name
 *              - availablePlaces
 *              - startDate
 *              - endDate
 *              - price
 *              - information
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Event identifiant
 *                  readOnly: true
 *              name:
 *                  type: string
 *                  description: Name of event
 *              availablePlaces:
 *                  type: integer
 *                  description: Available places count
 *              startDate:
 *                  type: string
 *                  format: date-time
 *                  description: Event start date and time
 *              endDate:
 *                  type: string
 *                  format: date-time
 *                  description: Event end date and time
 *              price:
 *                  type: integer
 *                  description: Cost to enter the event
 *              information:
 *                  type: string
 *                  description: Event information and description
 *              place:
 *                  oneOf:
 *                      - type: integer
 *                        description: Id of place where event takes places
 *                      - $ref: '#/components/schemas/Place'
 *              organizer:
 *                  oneOf:
 *                      - type: integer
 *                        description: Id of group organizing the event
 *                      - $ref: '#/components/schemas/Group'
 *              participants:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/User'
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
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Event'
 */
router.get("/", async (req, res) => {
    res.json(await EventService.getAllEvents());
});

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
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 */
router.post("/", async (req, res) => {
    if (req.body.event == null) {
        res.statusCode = 400;
        res.statusMessage = "No event passed";
        res.end();
        return;
    }
    const event = await EventService.addEvent(req.body.event);
    res.json(event);
});

/**
 * @swagger
 * /events/{id}:
 *  get:
 *      tags: [Events]
 *      summary: Get event by id
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Event'
 *          400:
 *              description: Authorization error
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the event to get
 */
router.get("/:id", async (req, res) => {
    console.log(req.params.id);
    const event = await EventService.getOneEvent(req.params.id);
    if (event == null) {
        res.statusCode = 400;
        res.statusMessage = "Invalid event id";
        res.end();
        return;
    } else {
        res.json(event);
    }
});

/**
 * @swagger
 * /events/{id}:
 *  delete:
 *      tags: [Events]
 *      summary: Remove event by id
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the event to delete
 *      responses:
 *          '200':
 *              description: OK
 *          '401':
 *              description: Invalid authorization
 */
router.delete("/:id", async (req, res) => {
    await EventService.removeEvent(req.params.id);
    res.status(200).end();
});

module.exports = router;
