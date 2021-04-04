const DBClient = require("./DBConnection");

var {minimalView} = require('../models/User');

exports.getGroupById = async function(id){
    const res = await DBClient('group').where({"id": id})
    if(res.length == 0){
        return null;
    }
    else{
        return res[0];
    }
}

exports.getMembers = async function(id){
    const res = await DBClient.from('user').whereIn('id',DBClient('membership').select('user_id').where('group_id', id)).select(minimalView);
    return res;
}