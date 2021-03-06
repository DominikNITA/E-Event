const express = require("express");
const router = express.Router();

const CategoryService = require("../services/CategoryService");

const ErrorResponse = require("../utility/ErrorResponse");

/** 
    @swagger
    tags:
        - name: Categories
          description: API to manage your groups. 
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      Category:
 *          type: object
 *          required:
 *              - id
 *              - title
 *              - description
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Category identifiant
 *                  readOnly: true
 *              title:
 *                  type: string
 *                  description: Category's title
 *              description:
 *                  type: string
 *                  description: Category description
 */

/**
 * @swagger
 * /categories:
 *  get:
 *      tags: [Categories]
 *      summary: Get all categories
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
 *          404:
 *              description: Resource not found
 */
router.get("/", async (req, res, next) => {
    try {
        const categories = await CategoryService.getAllCategories();
        res.json({ categories: categories, count: categories.length });
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /categories:
 *  post:
 *      tags: [Categories]
 *      summary: Add new category
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Category'
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          ref: '#/components/schemas/Category'
 *          400:
 *              description: Resource not found
 */
router.post("/", async (req, res, next) => {
    try {
        const category = await CategoryService.addNewCategory(req.body);
        res.json({ category: category });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
