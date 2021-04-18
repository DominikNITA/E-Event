class User {
    id;
    firstName;
    lastName;
    nick;
    entity;
    email;
    subscribedEvents;
    member;
    admin;
}

const select = ["id", "first_name as firstName", "last_name as lastName", "nick", "entity", "email"];

const minimalView = ["id", "first_name as firstName", "last_name as lastName", "nick"];

const availableQueryFilters = ["subscribedEvents", "member", "admin"];

module.exports = { User, minimalView, select, availableQueryFilters };
