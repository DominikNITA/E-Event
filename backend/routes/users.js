const express = require("express");
const router = express.Router();

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

module.exports = router;
