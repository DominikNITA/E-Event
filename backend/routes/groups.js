const express = require('express');
const router = express.Router();

const GroupService = require('../services/GroupService')

//TODO: move to utility class
const endWithError = function(res, message){
    res.statusCode = 400;
    res.statusMessage = message;
    res.end();
}

router.get('/:id', async (req,res) => {
    const group = await GroupService.getGroupById(req.params.id);
    if(group == null){
        endWithError(res,"Invalid group id");
        return;
    }
    res.json(group);
})

router.get('/:id/members', async (req,res) => {
    const members = await GroupService.getMembers(req.params.id)
    if(members.length == 0){
        endWithError(res,"Invalid group id");
        return;
    }
    res.json(members);
})

router.post('/:id/members', async (req,res) => {
    const members = await GroupService.addMember(req.body.userId, req.params.id);
    res.json(members);
})

router.delete('/:id/members', async (req,res) => {
    const members = await GroupService.removeMember(req.body.userId, req.params.id);
    res.json(members);
})

router.get('/:id/administrators', async (req,res) => {
    const administrators = await GroupService.getAdministrators(req.params.id)
    res.json(administrators);
})

router.post('/:id/administrators', async (req,res) => {
    const administrators = await GroupService.addAdministrator(req.body.userId, req.params.id);
    res.json(administrators);
})

router.delete('/:id/administrators', async (req,res) => {
    const administrators = await GroupService.removeAdministrator(req.body.userId, req.params.id);
    res.json(administrators);
})

router.get('/:id/events', async (req,res) => {
    const events = await GroupService.getGroupsEvents(req.params.id);
    res.json(events);
})

router.post('/:id/events', async (req,res) => {
    const event = await GroupService.addEventToGroup(req.params.id, req.body.event);
    res.json(event);
})

module.exports = router;