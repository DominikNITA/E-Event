const express = require("express");
const router = express.Router();

const GroupService = require("../services/GroupService");

const ErrorResponse = require("../utility/ErrorResponse");

const checkGroupExistence = async (req, res, next) => {
    console.log(req.params.groupId);
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
 * /groups/{id}:
 *  get:
 *      tags: [Groups]
 *      summary: Get group by id
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Group'
 *          400:
 *              description: Authorization error
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: Numeric id of the group to get
 */
router.get("/:groupId", async (req, res, next) => {
    try {
        const group = await GroupService.getGroupById(req.params.groupId);
        res.json(group);
    } catch (err) {
        next(err);
    }
});

router.get("/:groupId/members", async (req, res, next) => {
    try {
        const members = await GroupService.getMembers(req.params.groupId);
        res.json(members);
    } catch (err) {
        next(err);
    }
});

router.post("/:groupId/members", async (req, res, next) => {
    try {
        const members = await GroupService.addMember(req.body.userId, req.params.groupId);
        res.json(members);
    } catch (err) {
        next(err);
    }
});

router.delete("/:groupId/members", async (req, res, next) => {
    try {
        const members = await GroupService.removeMember(req.body.userId, req.params.groupId);
        res.json(members);
    } catch (err) {
        next(err);
    }
});

router.get("/:groupid/administrators", async (req, res, next) => {
    try {
        const administrators = await GroupService.getAdministrators(req.params.groupid);
        res.json(administrators);
    } catch (err) {
        next(err);
    }
});

router.post("/:groupId/administrators", async (req, res, next) => {
    try {
        const administrators = await GroupService.addAdministrator(req.body.userId, req.params.groupId);
        res.json(administrators);
    } catch (err) {
        next(err);
    }
});

router.delete("/:groupId/administrators", async (req, res, next) => {
    try {
        const administrators = await GroupService.removeAdministrator(req.body.userId, req.params.groupId);
        res.json(administrators);
    } catch (err) {
        next(err);
    }
});

router.get("/:groupId/events", async (req, res, next) => {
    try {
        const events = await GroupService.getGroupsEvents(req.params.groupId);
        res.json(events);
    } catch (err) {
        next(err);
    }
});

router.post("/:groupId/events", async (req, res, next) => {
    try {
        const event = await GroupService.addEventToGroup(req.params.groupId, req.body.event);
        res.json(event);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
