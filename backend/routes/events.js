const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const EventService = require("../services/EventService");
const ErrorResponse = require("../utility/ErrorResponse");

/** 
    @swagger
    tags:
        - name: Events
          description: API to manage your events. 
*/

/**
 * @swagger
 * components:
 *  parameters:
 *      EventIncludeQuery:
 *          in: query
 *          name: include
 *          style: form
 *          explode: false
 *          schema:
 *            type: array
 *            items:
 *                type: string
 *                enum: ["place","organizer","participants"]
 *
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
 *              - placeId
 *              - organizerId
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
 *              placeId:
 *                  type: integer
 *                  description: Id of place where event takes places
 *              place:
 *                  $ref: '#/components/schemas/Place'
 *              organizerId:
 *                  type: integer
 *                  description: Id of group organizing the event
 *              organizer:
 *                  $ref: '#/components/schemas/Group'
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
 *     parameters:
 *          - in: query
 *            name: search
 *            schema:
 *              type: string
 *            description: Searched string
 *          - $ref: '#/components/parameters/EventIncludeQuery'
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
router.get("/", async (req, res, next) => {
    try {
        let includeQuery = req.query.include?.split(",") ?? [];
        if (req.query.search) {
            res.json(await EventService.searchEvents(req.query.search, includeQuery));
        } else {
            res.json(await EventService.getAllEvents(includeQuery));
        }
    } catch (err) {
        next(err);
    }
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
router.post("/", async (req, res, next) => {
    try {
        if (req.body.event == null) {
            throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "No event passed in body!");
        }
        const event = await EventService.addEvent(req.body.event);
        res.json(event);
    } catch (err) {
        next(err);
    }
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
 *          - $ref: '#/components/parameters/EventIncludeQuery'
 */
router.get("/:id", async (req, res, next) => {
    try {
        let includeQuery = req.query.include?.split(",") ?? [];
        const event = await EventService.getEventById(req.params.id, includeQuery);
        if (event == null) {
            throw new ErrorResponse(ErrorResponse.notFoundStatusCode, "Event not found!");
        } else {
            res.json(event);
        }
    } catch (err) {
        next(err);
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
router.delete("/:id", async (req, res, next) => {
    try {
        await EventService.removeEvent(req.params.id);
        res.status(200).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
