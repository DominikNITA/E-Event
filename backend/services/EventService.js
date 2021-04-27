const Event = require("../models/Event");

const DBClient = require("./DBConnection");

const { minimalView } = require("../models/User");

const ErrorResponse = require("../utility/ErrorResponse");

const GroupService = require("./GroupService");
const PlaceService = require("./PlaceService");

exports.applyIncludeFilter = async function (event, includeFilter) {
    if (includeFilter.includes("place")) {
        event.place = await DBClient("place").where({ id: event.placeId }).first();
    }
    if (includeFilter.includes("organizer")) {
        event.organizer = await GroupService.getGroupById(event.organizerId);
    }
    if (includeFilter.includes("participants")) {
        event.participants = await exports.getParticipants(event.id);
    }
    if (includeFilter.includes("categories")) {
        event.categories = await exports.getCategories(event.id);
    }
    return event;
};

exports.applyIncludeFilterToManyEvents = async function (events, includeFilter) {
    await Promise.all(
        events.map(async (event) => {
            event = await this.applyIncludeFilter(event, includeFilter);
            return event;
        }, events)
    );

    return events;
};

exports.getEventById = async function (id, includeFilter = []) {
    const res = await DBClient("event").where({ id: id }).select(Event.select);
    if (res.length == 0) {
        return null;
    }
    let event = res[0];
    event = await this.applyIncludeFilter(event, includeFilter);
    return event;
};

exports.getAllEvents = async function (includeFilter = []) {
    //TODO: Send only events from groups to which user is subscribed
    let events = await DBClient("event").select(Event.select);
    events = await this.applyIncludeFilterToManyEvents(events, includeFilter);
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
    const eventResponse = await this.getEventById(eventId[0]);
    return eventResponse;
};

exports.searchEvents = async function (searchQuery, includeFilter = []) {
    let foundEvents = await DBClient("event")
        .where("event_name", "ILIKE", `%${searchQuery}%`)
        .orWhere("information", "ILIKE", `%${searchQuery}%`)
        .select(Event.select);
    // `ILIKE` in Postgres means case Insensitive
    foundEvents = await this.applyIncludeFilterToManyEvents(foundEvents, includeFilter);
    return foundEvents;
};

exports.doesEventExist = async function (eventId) {
    return (await DBClient("event").where({ id: eventId }).first()) != null;
};

exports.removeEvent = async function (eventId) {
    if (!this.doesEventExist(id)) {
        throw new ErrorResponse(ErrorResponse.notFoundStatusCode, "Event not found!");
    }
    await DBClient("event").where({ id: eventId }).del();
};

exports.getParticipants = async function (eventId, includeQuery = []) {
    return await DBClient("user")
        .whereIn("id", DBClient("participation").select("user_id").where("event_id", eventId))
        .select(minimalView);
};

exports.addParticipant = async function (eventId, userId) {
    const relationAlreadyExisting = await DBClient("participation").where({ user_id: userId, event_id: eventId });
    if (relationAlreadyExisting.length > 0) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "User already participating in the event!");
    }
    //TODO: Check if user exists
    await DBClient("participation").insert({ user_id: userId, event_id: eventId });
    return await this.getParticipants(eventId);
};

exports.getOrganizer = async function (eventId, includeQuery = []) {
    //TODO: Refactor
    let event = await this.getEventById(eventId);
    let organizer = await GroupService.getGroupById(event.organizerId);
    return organizer;
};

exports.getPlace = async function (eventId) {
    let place = await PlaceService.getPlaceById();
    return place;
};

exports.getCategories = async function (eventId) {
    const categories = await DBClient("event_category").Where({ event_id: eventId });
    return categories;
};
