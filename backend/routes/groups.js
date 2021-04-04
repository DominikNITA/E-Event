const express = require('express');
const router = express.Router();

const GroupService = require('../services/GroupService')

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
    res.json(members)
})

module.exports = router;