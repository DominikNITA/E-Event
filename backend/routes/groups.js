const express = require("express");
const router = express.Router();

const GroupService = require("../services/GroupService");

const ErrorResponse = require("../utility/ErrorResponse");

const checkGroupExistence = async (req, res, next) => {
    if (await GroupService.doesGroupExist(req.params.groupId)) {
        next();
    } else {
        next(new ErrorResponse(ErrorResponse.notFoundStatusCode, "Invalid group id"));
    }
};

router.use("/:groupId", checkGroupExistence);

/** 
    @swagger
    tags:
        - name: Groups
          description: API to manage your groups. 
*/

/**
 * @swagger
 * components:
 *  parameters:
 *      GroupIncludeQuery:
 *          in: query
 *          name: include
 *          style: form
 *          explode: false
 *          schema:
 *            type: array
 *            items:
 *                type: string
 *                enum: ["members","administrators","events"]
 *  schemas:
 *      Group:
 *          type: object
 *          required:
 *              - id
 *              - name
 *          properties:
 *              id:
 *                  type: integer
 *                  description: Group identifiant
 *                  readOnly: true
 *              name:
 *                  type: string
 *                  description: Name of group
 *              members:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/User'
 *              administrators:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/User'
 *              events:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Event'
 */

/**
 * @swagger
 * /groups/:
 *   get:
 *     tags: [Groups]
 *     summary: Get all groups
 *     security:
 *          - basicAuth: []
 *     responses:
 *       200:
 *         description: Returns all groups
 *         content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Group'
 */
router.get("/", async (req, res) => {
    res.json(await GroupService.getAllGroups());
});

/**
 * @swagger
 * /groups/{id}:
 *  get:
 *      tags: [Groups]
 *      summary: Get group by id
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the group
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Group'
 *          404:
 *              description: Resource not found
 */
router.get("/:groupId", async (req, res, next) => {
    try {
        const group = await GroupService.getGroupById(req.params.groupId);
        res.json(group);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /groups/{id}/members:
 *  get:
 *      tags: [Groups]
 *      summary: Get members of group with given id
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the group
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *          404:
 *              description: Resource not found
 */
router.get("/:groupId/members", async (req, res, next) => {
    try {
        const members = await GroupService.getMembers(req.params.groupId);
        res.json(members);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /groups/{id}/members:
 *  post:
 *      tags: [Groups]
 *      summary: Add new member to the group
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the group
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
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
router.post("/:groupId/members", async (req, res, next) => {
    try {
        if (req.user.id != req.body.userId) {
            throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "You cannot add someone else to the group!");
        }
        const members = await GroupService.addMember(req.body.userId, req.params.groupId);
        res.json(members);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /groups/{id}/members:
 *  delete:
 *      tags: [Groups]
 *      summary: Remove member by id
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the group
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
 *          '200':
 *              description: OK
 *          '401':
 *              description: Invalid authorization
 */
router.delete("/:groupId/members", async (req, res, next) => {
    try {
        if (!(await GroupService.isAdministrator(req.user.id, req.params.groupId)) && req.body.userId != req.user.id) {
            throw new ErrorResponse(
                ErrorResponse.forbiddenStatusCode,
                "You cannot remove this person from this group (permission denied)!"
            );
        }
        const members = await GroupService.removeMember(req.body.userId, req.params.groupId);
        res.json(members);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /groups/{id}/administrators:
 *  get:
 *      tags: [Groups]
 *      summary: Get administrators of group with given id
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the group
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *          404:
 *              description: Resource not found
 */
router.get("/:groupid/administrators", async (req, res, next) => {
    try {
        const administrators = await GroupService.getAdministrators(req.params.groupid);
        res.json(administrators);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /groups/{id}/administrators:
 *  post:
 *      tags: [Groups]
 *      summary: Add new administrator to the group
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the group
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
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
router.post("/:groupId/administrators", async (req, res, next) => {
    try {
        if (!(await GroupService.isAdministrator(req.user.id, organizer.id))) {
            throw new ErrorResponse(
                ErrorResponse.forbiddenStatusCode,
                "You cannot add this person as the administrator (permission denied)!"
            );
        }
        const administrators = await GroupService.addAdministrator(req.body.userId, req.params.groupId);
        res.json(administrators);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /groups/{id}/administrators:
 *  delete:
 *      tags: [Groups]
 *      summary: Remove from administrator role but left in group
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the group
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
 *          '200':
 *              description: OK
 *          '401':
 *              description: Invalid authorization
 */
router.delete("/:groupId/administrators", async (req, res, next) => {
    try {
        if (!(await GroupService.isAdministrator(req.user.id, req.params.groupId)) && req.body.userId != req.user.id) {
            throw new ErrorResponse(
                ErrorResponse.forbiddenStatusCode,
                "You cannot remove this person from this group's admins (permission denied)!"
            );
        }
        const administrators = await GroupService.removeAdministrator(req.body.userId, req.params.groupId);
        res.json(administrators);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /groups/{id}/events:
 *  get:
 *      tags: [Groups]
 *      summary: Get events organized by group with given id
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the group
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Event'
 *          404:
 *              description: Resource not found
 */
router.get("/:groupId/events", async (req, res, next) => {
    try {
        const events = await GroupService.getGroupsEvents(req.params.groupId);
        res.json(events);
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /groups/{id}/events:
 *  post:
 *      tags: [Groups]
 *      summary: Creates a new event for given group
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the group
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
router.post("/:groupId/events", async (req, res, next) => {
    try {
        if (!(await GroupService.isAdministrator(req.user.id, req.params.groupId))) {
            throw new ErrorResponse(
                ErrorResponse.forbiddenStatusCode,
                "You cannot add new event to this group (permission denied)!"
            );
        }
        const event = await GroupService.addEventToGroup(req.params.groupId, req.body.event);
        res.json(event);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
