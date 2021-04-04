const DBClient = require("./DBConnection");

var {minimalView} = require('../models/User');

let doesGroupExist = function(id){
    return this.getGroupById(id) != null;
}

exports.getGroupById = async function(id){
    const res = await DBClient('group').where({"id": id})
    return res.length == 0 ? null : res[0];
}

exports.getMembers = async function(id){
    const res = await DBClient.from('user').whereIn('id',DBClient('membership').select('user_id').where('group_id', id)).select(minimalView);
    return res;
}

exports.addMember = async function(userId, groupId){
    const relationAlreadyExisting = await DBClient('membership').where({'user_id' : userId, 'group_id': groupId});
    if(relationAlreadyExisting.length > 0){
        throw new Exception("User already in the group");
    }
    if(!this.doesGroupExist(groupId)){
        throw new Exception("Invalid group id")
    }
    //TODO: Check if user exists
    await DBClient('membership').insert({'user_id' : userId, 'group_id' : groupId});
    return this.getMembers(groupId);
}

