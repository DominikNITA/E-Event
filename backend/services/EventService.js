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

exports.getAllEvents = async function(){
    //TODO: Send only events from groups to which user is subscribed
    const events = await DBClient('event');
    return events;
}

exports.addEvent = async function(event){
    //TODO: Check event
    const eventId = await DBClient('event').insert({
        'event_name': event.name,
        'place_id': event.place.id,
        'organizer_id': event.organizer.id,
        'available_places': event.availablePlaces,
        'start_date': event.startDate,
        'end_date': event.endDate,
        'price': event.price,
        'information': event.information
    }).returning('id');
    const eventResponse = await this.getOneEvent(eventId[0]);
    return eventResponse;
}

exports.removeEvent = async function(id){
    await DBClient('event').where({"id" : id}).del()
}

