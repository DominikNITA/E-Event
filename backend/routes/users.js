const express = require("express");
const router = express.Router();

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
 */

router.get("/", async (req, res, next) => {
    try {
        // a faire
        let result = await UserService.getAllUsers();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
