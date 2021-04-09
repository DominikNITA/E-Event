const DBClient = require("./DBConnection");

const { minimalView } = require("../models/User");

exports.getAllUsers = async function () {
    return await DBClient("user")
        .select(minimalView);
}

exports.getUserById = async function (clientId) {
    const userResponse = await DBClient("user").where({ id: clientId }).select(User.select);
    return userResponse.length == 0 ? null : userResponse[0];
}

exports.addUser = async function (user) {
    //TODO : CHECK USER GOOD CONSTRUCTION
    const userId = await DBClient("user")
        .insert({
            first_name : user.first_name,
            last_name : user.last_name,
            nick : user.nick,
            entity : user.entity,
            email : user.email
        })
        .returning("id");
    const userResponse = await this.getUserById(userId[0]);
    return userResponse;
}

exports.anonymizeUser = async function (idUser) {
    await DBClient("user").where({ id: idUser })
        .update({first_name: 'anonymized', last_name: 'anonymized'});
    return await DbCLient("user").where({ id: idUser });
};