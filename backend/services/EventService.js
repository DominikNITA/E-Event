const Event = require("../models/Event");

const DBClient = require("./DBConnection");

exports.getOneEvent = async function(id){ 
    //Read from DB
    const res = await DBClient.from('event').where({id: id})
    console.log(res)
    return res[0];
    // return {
    //     id: id,
    //     name: "Example Event"+id
    // }
}

exports.getAllEvents = function(){
    return [{
        id: 2,
        name: "Example Event"
    },
    {
        id: 1,
        name: "Example Event 2"
    }]
}

exports.addEvent = function(event){
    return event;
}

