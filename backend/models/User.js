class User{
    id;
    first_name;
    last_name;
    nick;
    entity;
    email;
    subscribed_events;
}

const minimalView = ["id","first_name","last_name","nick"];

module.exports = { User, minimalView }