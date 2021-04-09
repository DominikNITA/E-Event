const Event = require("../models/Event");

const DBClient = require("./DBConnection");

const { minimalView } = require("../models/User");

const ErrorResponse = require("../utility/ErrorResponse");

exports.getOneEvent = async function (id, filters = []) {
    const res = await DBClient("event").where({ id: id }).select(Event.select);
    if (res.length == 0) {
        return null;
    }
    let event = res[0];
    if (filters.includes("place")) {
        event.place = await DBClient("place").where({ id: event.placeId }).first();
        delete event.placeId;
    }
    if (filters.includes("organizer")) {
        event.organizer = await DBClient("group").where({ id: event.organizerId }).first();
        delete event.organizerId;
    }
    if (filters.includes("participants")) {
        event.participants = await DBClient("user")
            .whereIn("id", DBClient("participation").select("user_id").where("event_id", id))
            .select(minimalView);
    }
    return event;
};

exports.getAllEvents = async function () {
    //TODO: Send only events from groups to which user is subscribed
    const events = await DBClient("event").select(Event.select);
    return events;
};

exports.addEvent = async function (event) {
    //TODO: Check event
    const eventId = await DBClient("event")
        .insert({
            event_name: event.name,
            place_id: event.place.id,
            organizer_id: event.organizer.id,
            available_places: event.availablePlaces,
            start_date: event.startDate,
            end_date: event.endDate,
            price: event.price,
            information: event.information,
        })
        .returning("id");
    const eventResponse = await this.getOneEvent(eventId[0]);
    return eventResponse;
};

exports.searchEvents = async function (searchQuery) {
    return [];
};

exports.removeEvent = async function (id) {
    await DBClient("event").where({ id: id }).del();
};
