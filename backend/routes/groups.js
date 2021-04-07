const express = require('express');
const router = express.Router();

const GroupService = require('../services/GroupService');

const ErrorResponse =  require('../utility/ErrorResponse');

const groupExistenceMiddleware = async (req,res,next) =>{
    console.log(req.params.groupId)
    if(await GroupService.doesGroupExist(req.params.groupId)){
        next();
    }
    else{
        next(new ErrorResponse(ErrorResponse.notFoundStatusCode,"Invalid group id"));
    }
}


router.get('/:groupId', groupExistenceMiddleware, async (req,res,next) => {
    try{
        const group = await GroupService.getGroupById(req.params.groupId);
        res.json(group);
    }
    catch(err){
        next(err);
    }
})

router.get('/:groupId/members', groupExistenceMiddleware, async (req,res,next) => {
    try{
        const members = await GroupService.getMembers(req.params.groupId)
        res.json(members);
    }
    catch(err){
        next(err);
    }
})

router.post('/:groupId/members', groupExistenceMiddleware, async (req,res,next) => {
    const members = await GroupService.addMember(req.body.userId, req.params.groupId);
    res.json(members);
})

router.delete('/:groupId/members', groupExistenceMiddleware, async (req,res,next) => {
    const members = await GroupService.removeMember(req.body.userId, req.params.groupId);
    res.json(members);
})

router.get('/:groupid/administrators', groupExistenceMiddleware, async (req,res,next) => {
    const administrators = await GroupService.getAdministrators(req.params.groupid)
    res.json(administrators);
})

router.post('/:groupId/administrators', groupExistenceMiddleware, async (req,res,next) => {
    const administrators = await GroupService.addAdministrator(req.body.userId, req.params.groupId);
    res.json(administrators);
})

router.delete('/:groupId/administrators', groupExistenceMiddleware, async (req,res,next) => {
    const administrators = await GroupService.removeAdministrator(req.body.userId, req.params.groupId);
    res.json(administrators);
})

router.get('/:groupId/events', groupExistenceMiddleware, async (req,res,next) => {
    const events = await GroupService.getGroupsEvents(req.params.groupId);
    res.json(events);
})

router.post('/:groupId/events', groupExistenceMiddleware, async (req,res,next) => {
    const event = await GroupService.addEventToGroup(req.params.groupId, req.body.event);
    res.json(event);
})

module.exports = router;