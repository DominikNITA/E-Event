const Event = require("../models/Event");

const DBClient = require("./DBConnection");

exports.getOneEvent = async function(id){ 
    //Read from DB
    // const testRes = await DBClient.from('user').whereIn('id',DBClient('membership').select('user_id').where('groupe_id', 1));
    // console.log(testRes);
    const res = await DBClient.from('event').join('groupe', function(){this.on('event.organizer_id','=','groupe.id')}).where({"event.id": id})
    if(res.length == 0){
        return null;
    }
    else{
        return res[0];
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

