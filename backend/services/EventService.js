const Event = require("../models/Event");



exports.getOne = function(id){
    //Read from DB
    return {
        id: id,
        name: "Example Event"+id
    }
}

exports.getAll = function(){
    return [{
        id: 2,
        name: "Example Event"
    },
    {
        id: 1,
        name: "Example Event 2"
    }]
}

