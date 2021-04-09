const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const AuthService = require("../services/AuthService");
const ErrorResponse = require("../utility/ErrorResponse");
/** 
    @swagger
    tags:
        - name: Auth
          description: API to manage authentication. 
*/

/**
 * @swagger
 * /auth/login:
 *  post:
 *      tags: [Auth]
 *      summary: Login user and send back auth token
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Authentication successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          required:
 *                              - authToken
 *                          properties:
 *                              authToken:
 *                                  type: string
 */
router.post("/login", async (req, res, next) => {
    try {
        const userId = await AuthService.verifyCredentials(req.body.email, req.body.password);
        const accessToken = jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /auth/register:
 *  post:
 *      tags: [Auth]
 *      summary: Register new User
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - user
 *                          - password
 *                      properties:
 *                          user:
 *                              $ref: '#/components/schemas/User'
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Registration successful
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */
router.post("/register", async (req, res, next) => {
    try {
        const user = await AuthService.registerUser(req.body.user);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
