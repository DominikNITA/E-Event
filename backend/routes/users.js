const express = require("express");
const router = express.Router();

const User = require ("../models/user");
const UserService = require("../services/UserService");

/** 
    @swagger
    tags:
        - name: Users
          description: API to manage your users. 
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - id
 *              - firstName
 *              - lastName
 *              - nick
 *              - email
 *          properties:
 *              id:
 *                  type: integer
 *                  description: User identifiant
 *                  readOnly: true
 *              firstName:
 *                  type: string
 *                  description: User's first name
 *              lastName:
 *                  type: string
 *                  description: User's last name
 *              nick:
 *                  type: string
 *                  description: User's nickname
 *              email:
 *                  type: string
 *                  format: email
 *                  description: User's email
 */


/**
 *
 * @swagger
 * /users/:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     security:
 *          - basicAuth: []
 *     responses:
 *       200:
 *         description: Returns all users
 *         content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/User'
 */
router.get("/", async (req, res) => {
    res.json(await UserService.getAllUsers());
});

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      tags: [Users]
 *      summary: Get user by id
 *      security:
 *          - basicAuth: []
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: Authorization error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the user to get
 */
 router.get("/:id", async (req, res) => {
    console.log(req.params.id);
    const user = await UserService.getUserById(req.params.id);
    if (user == null) {
        res.statusCode = 400;
        res.statusMessage = "Invalid user id";
        res.end();
        return;
    } else {
        res.json(user);
    }
});


/**
 * @swagger
 * /users/:
 *  post:
 *      tags: [Users]
 *      summary: Creates new user
 *      security:
 *          - basicAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: User creation error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
 router.post("/", async (req, res) => {
    if (req.body.user == null) {
        res.statusCode = 400;
        res.statusMessage = "Failed to create user";
        res.end();
        return;
    }
    const user = await UserService.addUser(req.body.user);
    res.json(user);
});

/**
 * @swagger
 * /users/{Id}:
 *  post:
 *      tags: [Users]
 *      summary: Anonymise user
 *      security:
 *          - basicAuth: []
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: User anonymation error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the user to anonymise
 */
 router.post("/:id", async (req, res) => {
    console.log(req.params.id);
    const user = await UserService.anonymizeUser(req.params.id);
    if (user == null) {
        res.statusCode = 400;
        res.statusMessage = "Can't find user id";
        res.end();
        return;
    }
    res.json(user);
});

module.exports = router;
