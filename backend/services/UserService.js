const DBClient = require("./DBConnection");

const UserModel = require("../models/User");

const ErrorResponse = require("../utility/ErrorResponse");

const isUserOk = function (user) {
    return (user.lastName.length != 0 && user.firstName.length != 0 && user.email.length != 0);
};

exports.getAllUsers = async function () {
    return await DBClient("user").select(UserModel.minimalView);
};

exports.getUserById = async function (idUser) {
    const userResponse = await DBClient("user").where({ id: idUser }).select(UserModel.select);
    return userResponse.length == 0 ? null : userResponse[0];
};

exports.getUserByEmail = async function (email) {
    if(!email) throw new ErrorResponse(ErrorResponse.badRequestStatusCode,"Email not passed");
    const userResponse = await DBClient("user").where({ email: email }).select(UserModel.select);
    return userResponse.length == 0 ? null : userResponse[0];
};

exports.addUser = async function (user) {
    if (!isUserOk(user)) throw new ErrorResponse(ErrorResponse.badRequestStatusCode," Failed to create user : bad user construction");
    const userId = await DBClient("user")
        .insert({
            first_name : user.firstName,
            last_name : user.lastName,
            nick : user.nick,
            email : user.email,
        })
        .returning("id");
    const userResponse = await this.getUserById(userId[0]);
    return userResponse;
};

exports.anonymizeUser = async function (idUser) {
    await DBClient("user").where({ id : idUser }).update({ 
        first_name: 'anonymized', 
        last_name: 'anonymized', 
        nick: 'anonymised', 
        email: 'anonymised' 
    });
    return await this.getUserById(idUser);
};

exports.modifyUser = async function (idUser, user) {
    if (!isUserOk(user)) throw new ErrorResponse(ErrorResponse.badRequestStatusCode," Failed to modify user : bad user construction");
    await DBClient("user").where({ id: idUser })
        .update({
            first_name: user.firstName,
            last_name: user.lastName,
            nick: user.nick,
            email: user.email,
        })
    return await this.getUserById(idUser);
}