const express = require("express");
const { User } = require("../models/User");
const router = express.Router();

const EventService = require("../services/EventService");
const GroupService = require("../services/GroupService");
const UserService = require("../services/UserService");
const ErrorResponse = require("../utility/ErrorResponse");

const checkEventExistence = async (req, res, next) => {
    if (await EventService.doesEventExist(req.params.eventId)) {
        next();
    } else {
        next(new ErrorResponse(ErrorResponse.notFoundStatusCode, "Invalid event id"));
    }
};

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
 *                enum: ["place","organizer","participants","categories"]
 *      EventPathId:
 *          in: path
 *          name: eventId
 *          schema:
 *            type: integer
 *          required: true
 *          description: Numeric id of the event to get
 *
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
 *              organizerId:
 *                  type: integer
 *                  description: Id of group organizing the event
 *              place:
 *                  readOnly: true
 *                  allOf:
 *                      - $ref: '#/components/schemas/Place'
 *              organizer:
 *                  readOnly: true
 *                  allOf:
 *                      - $ref: '#/components/schemas/Group'
 *              participants:
 *                  readOnly: true
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/User'
 *              categories:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Category'
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
        if (req.body == null) {
            throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "No event passed in body!");
        }
        const event = await EventService.addEvent(req.body);
        res.json(event);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /events/{eventId}:
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
 *          - $ref: '#/components/parameters/EventPathId'
 *          - $ref: '#/components/parameters/EventIncludeQuery'
 */
router.get("/:eventId", async (req, res, next) => {
    try {
        let includeQuery = req.query.include?.split(",") ?? [];
        const event = await EventService.getEventById(req.params.eventId, includeQuery);
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
 * /events/{eventId}:
 *  delete:
 *      tags: [Events]
 *      summary: Remove event by id
 *      parameters:
 *          - $ref: '#/components/parameters/EventPathId'
 *      responses:
 *          '200':
 *              description: OK
 *          '401':
 *              description: Invalid authorization
 */
router.delete("/:eventId", checkEventExistence, async (req, res, next) => {
    try {
        const eventToDelete = await EventService.getEventById(req.params.eventId);
        if (!(await GroupService.isAdministrator(req.user.id, eventToDelete.organizerId))) {
            throw new ErrorResponse(ErrorResponse.forbiddenStatusCode, "You cannot delete this event!");
        }
        await EventService.removeEvent(req.params.eventId);
        res.status(200).end();
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /events/{eventId}/organizer:
 *  get:
 *      tags: [Events]
 *      summary: Get organizer from event's id
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Group'
 *          400:
 *              description: Authorization error
 *      parameters:
 *          - $ref: '#/components/parameters/EventPathId'
 *          - $ref: '#/components/parameters/GroupIncludeQuery'
 */
router.get("/:eventId/organizer", checkEventExistence, async (req, res, next) => {
    try {
        let includeQuery = req.query.include?.split(",") ?? [];
        const organizer = await EventService.getOrganizer(req.params.eventId, includeQuery);
        if (organizer == null) {
            throw new ErrorResponse(ErrorResponse.notFoundStatusCode, "Event's organizer not found!");
        } else {
            res.json(organizer);
        }
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /events/{eventId}/participants:
 *  get:
 *      tags: [Events]
 *      summary: Get participants from event's id
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *          400:
 *              description: Authorization error
 *      parameters:
 *          - $ref: '#/components/parameters/EventPathId'
 */
router.get("/:eventId/participants", checkEventExistence, async (req, res, next) => {
    try {
        let includeQuery = req.query.include?.split(",") ?? [];
        const participants = await EventService.getParticipants(req.params.eventId, includeQuery);
        if (participants == null) {
            throw new ErrorResponse(ErrorResponse.notFoundStatusCode, "Event's participants not found!");
        } else {
            res.json(participants);
        }
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /events/{eventId}/place:
 *  get:
 *      tags: [Events]
 *      summary: Get place where event is organized
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Place'
 *          400:
 *              description: Authorization error
 *      parameters:
 *          - $ref: '#/components/parameters/EventPathId'
 */
router.get("/:eventId/place", checkEventExistence, async (req, res, next) => {
    try {
        let includeQuery = req.query.include?.split(",") ?? [];
        const place = await EventService.getPlace(req.params.eventId, includeQuery);
        if (place == null) {
            throw new ErrorResponse(ErrorResponse.notFoundStatusCode, "Event's place not found!");
        } else {
            res.json(place);
        }
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /events/{eventId}/categories:
 *  get:
 *      tags: [Events]
 *      summary: Get categories to which event is saved
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              categories:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Category'
 *                              count:
 *                                  type: integer
 *          400:
 *              description: Authorization error
 *      parameters:
 *          - $ref: '#/components/parameters/EventPathId'
 */
router.get("/:eventId/categories", checkEventExistence, async (req, res, next) => {
    try {
        const categories = (await EventService.getCategories(req.params.eventId)) ?? [];
        res.json({ categories: categories, count: categories.length });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /events/{eventId}/participants:
 *  post:
 *      tags: [Events]
 *      summary: Add participant
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - userId
 *                      properties:
 *                          userId:
 *                              type: integer
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - userId
 *                          properties:
 *                              participants:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/User'
 *                              subscribedEvents:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Event'
 *          400:
 *              description: Authorization error
 *      parameters:
 *          - $ref: '#/components/parameters/EventPathId'
 */
router.post("/:eventId/participants", checkEventExistence, async (req, res, next) => {
    try {
        const organizer = await EventService.getOrganizer((await EventService.getEventById(req.params.eventId)).id);
        if (!(await GroupService.isAdministrator(req.user.id, organizer.id)) && req.body.userId != req.user.id) {
            throw new ErrorResponse(
                ErrorResponse.forbiddenStatusCode,
                "You cannot add this person to this event (permission denied)!"
            );
        }
        const participants = await EventService.addParticipant(req.params.eventId, req.body.userId);
        if (participants == null) {
            throw new ErrorResponse(ErrorResponse.notFoundStatusCode, "Couldn't add user as participant!");
        }
        res.json({
            participants: participants,
            subscribedEvents: await UserService.getSubscribedEvents(req.body.userId),
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
