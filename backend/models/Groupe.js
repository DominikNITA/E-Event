class Groupe {
    id;
    name;
    administrators;
    members;
    createdEvents;
}

const select = ["id", "group_name as name"];

module.exports = { Groupe, select };
