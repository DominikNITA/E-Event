const express = require("express");
const router = express.Router();

const ErrorResponse = require("../utility/ErrorResponse");

const Place = require ("../models/place");
const PlaceService = require("../services/PlaceService");

/** 
    @swagger
    tags:
        - name: Places
          description: API to manage your places. 
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      Place:
 *          type: object
 *          required:
 *              - id
 *              - name
 *              - description
 *              - address
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Place identifiant
 *                  readOnly: true
 *              name:
 *                  type: string
 *                  description: Place display name
 *              description:
 *                  type: string
 *                  description: Place description
 *              address:
 *                  type: string
 *                  description: Place address
 */


/**
 * @swagger
 * /places/:
 *   get:
 *     tags: [Places]
 *     summary: Get all places
 *     security:
 *          - basicAuth: []
 *     responses:
 *       200:
 *         description: Returns all places
 *         content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Place'
 */
router.get("/", async (req, res) => {
  res.json(await PlaceService.getAllPlaces());
});

/**
 * @swagger
 * /places/{id}:
 *  get:
 *      tags: [Places]
 *      summary: Get place by id
 *      security:
 *          - basicAuth: []
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Place'
 *          400:
 *              description: Authorization error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Place'
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the place to get
 */
 router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  const place = await PlaceService.getPlaceById(req.params.id);
  if (place == null) {
      res.statusCode = 400;
      res.statusMessage = "Place with id #" + req.params.id + " not found";
      res.end();
      return;
  } else {
      res.json(place);
  }
});


/**
 * @swagger
 * /places/:
 *  post:
 *      tags: [Places]
 *      summary: Creates new place
 *      security:
 *          - basicAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Place'
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Place'
 */
 router.post("/", async (req, res, next) => {
  try {
      if (req.body == null) {
          throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Failed to create place : request body is null");
      }
      const user = await PlaceService.addPlace(req.body);
      res.json(user);
  } catch (err) {
      next(err);
  }
});

/**
 * @swagger
 * /places/{id}:
 *  put:
 *      tags: [Places]
 *      summary: Modify place infos
 *      security:
 *          - basicAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Place'
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Place'
 *          400:
 *              description: User modification error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Place'
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the place to modify
 */
 router.put("/:id", async (req, res, next) => {
  console.log(req.params.id);
  if (req.body == null) {
      res.statusCode = 400;
      res.statusMessage = "Failed to modify place : request body is null";
      res.end();
      return;
  }
  if (await PlaceService.getPlaceById(req.params.id) == null) {
    res.statusCode = 400;
    res.statusMessage = "Place with id #" + req.params.id + " not found";
    res.end();
    return;
  }

  try {
    const user = await PlaceService.modifyPlace(req.params.id,req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
