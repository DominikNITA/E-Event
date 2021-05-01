class Place {
    id;
    address;
    place_name;
    description;
}

const select = ["id", "address", "place_name as name", "description"];

module.exports = { Place, select };
