class Event{
    id = 5;
    name;
    availablePlaces;
    startDate;
    endDate;
    price;
    information;
    place;
    organizer;
    participants;
}

const select = ["id","event_name as name","available_places as availablePlaces","start_date as startDate","end_date as endDate","price","information","place_id as placeId","organizer_id as organizerId"]

const availableQueryFilters = ["place","organizer","participants"];

module.exports = {Event, availableQueryFilters, select}