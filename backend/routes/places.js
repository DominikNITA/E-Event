const express = require("express");
const router = express.Router();

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

module.exports = router;
