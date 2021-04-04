const DBClient = require("./DBConnection");

var {minimalView} = require('../models/User');



exports.getGroupById = async function(groupId){
    const groupResponse = await DBClient('group').where({"id": groupId})
    return groupResponse.length == 0 ? null : groupResponse[0];
}

exports.getMembers = async function(groupId){
    return await DBClient('user').whereIn('id',DBClient('membership').select('user_id').where('group_id', groupId)).select(minimalView);
}

exports.addMember = async function(userId, groupId){
    const relationAlreadyExisting = await DBClient('membership').where({'user_id' : userId, 'group_id': groupId});
    if(relationAlreadyExisting.length > 0){
        throw "User already in the group";
    }
    if(! await doesGroupExist(groupId)){
        throw "Invalid group id";
    }
    //TODO: Check if user exists
    await DBClient('membership').insert({'user_id' : userId, 'group_id' : groupId});
    return await this.getMembers(groupId);
}

exports.removeMember = async function(userId, groupId){
    const relationToRemove = await DBClient('membership').where({'user_id' : userId, 'group_id': groupId});
    if(relationToRemove.length == 0){
        throw "User is not in the group";
    }
    if(! await doesGroupExist(groupId)){
        throw "Invalid group id";
    }
    //TODO: Check if user exists
    //TODO: Check credentials to check if caller can remove person from the group
    await DBClient('membership').where({'user_id' : userId, 'group_id': groupId}).del();
    await DBClient('administration').where({'user_id' : userId, 'group_id': groupId}).del();
    return await this.getMembers(groupId)
}

exports.getAdministrators = async function(groupId){
    return await DBClient('user').whereIn('id',DBClient('administration').select('user_id').where('group_id', groupId)).select(minimalView);
}

exports.addAdministrator = async function(userId, groupId){
    const relationAlreadyExisting = await DBClient('administration').where({'user_id' : userId, 'group_id': groupId});
    if(relationAlreadyExisting.length > 0){
        throw "User already in the group";
    }
    if(! await doesGroupExist(groupId)){
        throw "Invalid group id";
    }
    //TODO: Check if user exists
    //TODO: Check if user has rights to add new administrator
    await DBClient('administration').insert({'user_id' : userId, 'group_id' : groupId});
    return await this.getAdministrators(groupId);
}

exports.removeAdministrator = async function(userId, groupId){
    const relationToRemove = await DBClient('administration').where({'user_id' : userId, 'group_id': groupId});
    if(relationToRemove.length == 0){
        throw "User is not the administrator of the group";
    }
    if(! await doesGroupExist(groupId)){
        throw "Invalid group id";
    }
    //TODO: Check if user exists
    //TODO: Check credentials to check if caller can remove person from the administrator role
    await DBClient('administration').where({'user_id' : userId, 'group_id': groupId}).del();
    return await this.getAdministrators(groupId)
}

let doesGroupExist = async function(id){
    return await exports.getGroupById(id) != null;
}