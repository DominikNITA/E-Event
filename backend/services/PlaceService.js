const DBClient = require("./DBConnection");

const PlaceModel = require("../models/Place");

exports.getAllPlaces = async function () {
    return await DBClient("place").select(PlaceModel.select);
};

exports.getPlaceById = async function (placeId) {
    const placeResponse = await DBClient("place").where({ id: placeId });
    return placeResponse.length == 0 ? null : placeResponse[0];
};

exports.addPlace = async function (place) {
    //TODO: CHECK PLACE GOOD CONSTRUCTION
    const placeId = await DBClient("place")
        .insert({ 
            address : place.address,
            place_name : place.name,
            description : place.description
        })
        .returning("id");
    return await this.getPlaceById(placeId[0]);
};

exports.modifyPlace = async function (placeId, place) {
    //TODO: CHECK PLACE GOOD CONSTRUCTION
    await DBClient("place").where({ id : placeId })
        .update({
            address : place.address,
            place_name : place.name,
            description : place.description
        })
    return await this.getPlaceById(placeId);
};
