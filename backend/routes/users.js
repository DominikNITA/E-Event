const express = require("express");
const router = express.Router();

const ErrorResponse = require("../utility/ErrorResponse");

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
 *              memberOf:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Group'
 *                  description: Groups where user is a member
 *                  readOnly: true
 *              administratorOf:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Group'
 *                  description: Groups where user is an administrator
 *                  readOnly: true
 *              categories:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Category'
 *                  description: Favourite user's categories
 *                  readOnly: true
 */

/**
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

// /**
//  * @swagger
//  * /users/:
//  *  post:
//  *      tags: [Users]
//  *      summary: Creates new user
//  *      security:
//  *          - basicAuth: []
//  *      requestBody:
//  *          required: true
//  *          content:
//  *              application/json:
//  *                  schema:
//  *                      $ref: '#/components/schemas/User'
//  *      responses:
//  *          200:
//  *              description: OK
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          $ref: '#/components/schemas/User'
//  */
// router.post("/", async (req, res, next) => {
//     try {
//         if (req.body == null) {
//             throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Failed to create user : body is null");
//         }
//         const user = await UserService.addUser(req.body);
//         res.json(user);
//     } catch (err) {
//         next(err);
//     }
// });

/**
 * @swagger
 * /users/{id}:
 *  put:
 *      tags: [Users]
 *      summary: Modify user infos
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
 *              description: User modification error
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
 *            description: Numeric id of the user to modify
 */
router.put("/:id", async (req, res, next) => {
    console.log(req.params.id);
    if (req.body == null) {
        res.statusCode = 400;
        res.statusMessage = "Failed to modify user : request body is null";
        res.end();
        return;
    }

    if ((await UserService.getUserById(req.params.id)) == null) {
        res.statusCode = 400;
        res.statusMessage = "User with id #" + req.params.id + " not found";
        res.end();
        return;
    }

    try {
        const user = await UserService.modifyUser(req.params.id, req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /users/{id}/anonymise:
 *  put:
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
router.put("/:id/anonymise", async (req, res) => {
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

/**
 * @swagger
 * /users/{id}/groupsMember:
 *  get:
 *      tags: [Users]
 *      summary: Get user groups
 *      security:
 *          - basicAuth: []
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Group'
 *          400:
 *              description: Get User groups error
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the user to get groups
 */
router.get("/:id/groupsMember", async (req, res) => {
    console.log(req.params.id);
    const groups = await UserService.getGroupsWhereUserIsMember(req.params.id);
    if (groups == null) {
        res.statusCode = 400;
        res.statusMessage = "Can't find user id";
        res.end();
        return;
    }

    res.json(groups);
});

/**
 * @swagger
 * /users/{id}/groupsAdmin:
 *  get:
 *      tags: [Users]
 *      summary: Get user groups as admin
 *      security:
 *          - basicAuth: []
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Group'
 *          400:
 *              description: Get User groups as admin error
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Group'
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the user to get groups as admin
 */
router.get("/:id/groupsAdmin", async (req, res) => {
    const groups = await UserService.getGroupsWhereUserIsAdministrator(req.params.id);
    if (groups == null) {
        res.statusCode = 400;
        res.statusMessage = "Can't find user id";
        res.end();
        return;
    }

    res.json(groups);
});

/**
 * @swagger
 * /users/{id}/subscribedEvents:
 *  get:
 *      tags: [Users]
 *      summary: Get subscribed events
 *      security:
 *          - basicAuth: []
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Event'
 *          400:
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the user to get subscrived events
 */
router.get("/:id/subscribedEvents", async (req, res) => {
    res.json(await UserService.getSubscribedEvents(req.params.id));
});

module.exports = router;
