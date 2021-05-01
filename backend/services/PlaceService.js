const DBClient = require("./DBConnection");

const PlaceModel = require("../models/Place");

const ErrorResponse = require("../utility/ErrorResponse");

const isPlaceOk = function (place) {
    return place.address.length != 0 && place.name.length != 0;
};

exports.getAllPlaces = async function () {
    return await DBClient("place").select(PlaceModel.select);
};

exports.getPlaceById = async function (placeId) {
    const placeResponse = await DBClient("place").where({ id: placeId }).select(PlaceModel.select);
    return placeResponse.length == 0 ? null : placeResponse[0];
};

exports.addPlace = async function (place) {
    if (!isPlaceOk(place))
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, " Failed to create place : bad place construction");
    const placeId = await DBClient("place")
        .insert({
            address: place.address,
            place_name: place.name,
            description: place.description,
        })
        .returning("id");
    return await this.getPlaceById(placeId[0]);
};

exports.modifyPlace = async function (placeId, place) {
    if (!isPlaceOk(place))
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, " Failed to modify place : bad place construction");
    await DBClient("place").where({ id: placeId }).update({
        address: place.address,
        place_name: place.name,
        description: place.description,
    });
    return await this.getPlaceById(placeId);
};
