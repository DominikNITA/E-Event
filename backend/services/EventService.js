const Event = require("../models/Event");

const DBClient = require("./DBConnection");

const { minimalView } = require("../models/User");

const ErrorResponse = require("../utility/ErrorResponse");

const GroupService = require("./GroupService");

exports.getOneEvent = async function (id, includeFilter = []) {
    const res = await DBClient("event").where({ id: id }).select(Event.select);
    if (res.length == 0) {
        return null;
    }
    let event = res[0];

    if (includeFilter.includes("place")) {
        event.place = await DBClient("place").where({ id: event.placeId }).first();
        //delete event.placeId;
    }
    if (includeFilter.includes("organizer")) {
        event.organizer = await DBClient("group").where({ id: event.organizerId }).first();
        //delete event.organizerId;
    }
    if (includeFilter.includes("participants")) {
        event.participants = await DBClient("user")
            .whereIn("id", DBClient("participation").select("user_id").where("event_id", id))
            .select(minimalView);
    }
    return event;
};

exports.getAllEvents = async function (includeFilter = []) {
    //TODO: Send only events from groups to which user is subscribed
    const events = await DBClient("event").select(Event.select);

    if (includeFilter.includes("place")) {
        await Promise.all(
            events.map(async (event) => {
                event.place = await DBClient("place").where({ id: event.placeId }).first();
                //delete event.placeId;
                return event;
            }, events)
        );
    }
    if (includeFilter.includes("organizer")) {
        await Promise.all(
            events.map(async (event) => {
                event.organizer = await DBClient("group").where({ id: event.organizerId }).first();
                //delete event.organizerId;
                return event;
            }, events)
        );
    }
    if (includeFilter.includes("participants")) {
        await Promise.all(
            events.map(async (event) => {
                event.participants = await DBClient("user")
                    .whereIn("id", DBClient("participation").select("user_id").where("event_id", event.id))
                    .select(minimalView);
                return event;
            })
        );
    }
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

exports.searchEvents = async function (searchQuery, includeFilter = []) {
    let foundEvents = await DBClient("event")
        .where("event_name", "ILIKE", `%${searchQuery}%`)
        .orWhere("information", "ILIKE", `%${searchQuery}%`)
        .select(Event.select);
    // `ILIKE` in Postgres means case Insensitive
    if (includeFilter.includes("place")) {
        await Promise.all(
            foundEvents.map(async (event) => {
                event.place = await DBClient("place").where({ id: event.placeId }).first();
                //delete event.placeId;
                return event;
            }, foundEvents)
        );
    }
    if (includeFilter.includes("organizer")) {
        await Promise.all(
            foundEvents.map(async (event) => {
                event.organizer = await DBClient("group").where({ id: event.organizerId }).first();
                //delete event.organizerId;
                return event;
            }, foundEvents)
        );
    }
    if (includeFilter.includes("participants")) {
        await Promise.all(
            foundEvents.map(async (event) => {
                event.participants = await DBClient("user")
                    .whereIn("id", DBClient("participation").select("user_id").where("event_id", event.id))
                    .select(minimalView);
                return foundEvents;
            })
        );
    }
    return foundEvents;
};

exports.doesEventExist = async function (eventId) {
    return (await DBClient("event").where({ id: eventId }).first()) != null;
};

exports.removeEvent = async function (id) {
    if (!this.doesEventExist(id)) {
        throw new ErrorResponse(ErrorResponse.notFoundStatusCode, "Event not found!");
    }
    await DBClient("event").where({ id: id }).del();
};
