class User{
    id;
    firstName;
    lastName;
    nick;
    entity;
    email;
    subscribedEvents;
}

const minimalView = ["id","first_name as firstName","last_name as lastName","nick"];

module.exports = { User, minimalView }