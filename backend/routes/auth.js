const express = require("express");
const router = express.Router();

const AuthService = require("../services/AuthService");
const ErrorResponse = require("../utility/ErrorResponse");

const Middlewares = require("../utility/Middlewares");
/** 
    @swagger
    tags:
        - name: Auth
          description: API to manage authentication. 
*/
/**
 *  @swagger
 *  components:
 *      securitySchemes:
 *          basicAuth:     # <-- arbitrary name for the security scheme
 *              type: apiKey
 *              in: header
 *              name: auth
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
 *                              format: password
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
        const accessToken = await AuthService.generateAccessToken(userId);
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
 *                              format: password
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
        const user = await AuthService.registerUser(req.body.user, req.body.password);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /auth/changePassword:
 *  post:
 *      tags: [Auth]
 *      summary: Change user's password
 *      security:
 *          - basicAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - password
 *                      properties:
 *                          password:
 *                              type: string
 *                              format: password
 *      responses:
 *          200:
 *              description: Password changed successfully
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
router.post("/changePassword", Middlewares.authenticateToken, async (req, res, next) => {
    try {
        const newAccessToken = await AuthService.changePassword(req.body.password, req.user.id);
        res.json(newAccessToken);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /auth/demandPasswordRecovery:
 *  post:
 *      tags: [Auth]
 *      summary: Change user's password
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                      properties:
 *                          email:
 *                              type: string
 *                              format: email
 *      responses:
 *          200:
 *              description: Password recovery demand accepted
 */
router.post("/demandPasswordRecovery", async (req, res, next) => {
    try {
        await AuthService.demandPasswordRecovery(req.body.email);
        res.status(200).end();
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /auth/recoverPassword:
 *  post:
 *      tags: [Auth]
 *      summary: Change user's password
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - recoveryToken
 *                          - password
 *                      properties:
 *                          recoveryToken:
 *                              type: string
 *                          password:
 *                              type: string
 *                              format: password
 *      responses:
 *          200:
 *              description: Password changed successfully
 */
router.post("/recoverPassword", async (req, res, next) => {
    try {
        await AuthService.recoverPassword(req.body.recoverToken, req.body.password);
        res.status(200).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
