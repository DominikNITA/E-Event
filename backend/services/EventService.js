const Event = require("../models/Event");



exports.getOneEvent = function(id){
    //Read from DB
    return {
        id: id,
        name: "Example Event"+id
    }
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

