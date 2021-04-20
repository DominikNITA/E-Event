class Place{
    id;
    address;
    place_name;
    description;
}

const select = ["id", "address", "place_name", "description"];

module.exports = { Place, select };