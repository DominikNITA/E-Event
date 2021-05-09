const DBClient = require("./DBConnection");

const UserModel = require("../models/User");
const Event = require("../models/Event");

const ErrorResponse = require("../utility/ErrorResponse");

const EventService = require("./EventService");

const isUserOk = function (user) {
    return user.lastName.length != 0 && user.firstName.length != 0 && user.email.length != 0;
};

exports.getAllUsers = async function () {
    return await DBClient("user").select(UserModel.minimalView);
};

exports.getUserById = async function (idUser) {
    const userResponse = await DBClient("user").where({ id: idUser }).select(UserModel.select);
    if (userResponse.length == 0) return null;

    let user = userResponse[0];
    user.memberOf = await exports.getGroupsWhereUserIsMember(idUser);
    user.administratorOf = await exports.getGroupsWhereUserIsAdministrator(idUser);
    user.categories = await exports.getCategories(idUser);
    return user;
};

exports.getUserByEmail = async function (email) {
    if (!email) throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Email not passed");
    const userResponse = await DBClient("user").where({ email: email }).select(UserModel.select);
    return userResponse.length == 0 ? null : userResponse[0];
};

exports.addUser = async function (user) {
    if (!isUserOk(user))
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, " Failed to create user : bad user construction");
    const userId = await DBClient("user")
        .insert({
            first_name: user.firstName,
            last_name: user.lastName,
            nick: user.nick,
            email: user.email,
        })
        .returning("id");
    const userResponse = await this.getUserById(userId[0]);
    return userResponse;
};

exports.anonymizeUser = async function (idUser) {
    await DBClient("user").where({ id: idUser }).update({
        first_name: "anonymized",
        last_name: "anonymized",
        nick: "anonymised",
        email: "anonymised",
    });
    return await this.getUserById(idUser);
};

exports.modifyUser = async function (idUser, user) {
    if (!isUserOk(user))
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, " Failed to modify user : bad user construction");
    await DBClient("user").where({ id: idUser }).update({
        first_name: user.firstName,
        last_name: user.lastName,
        nick: user.nick,
        email: user.email,
    });
    return await this.getUserById(idUser);
};

exports.removeUser = async function (userId) {
    await DBClient("user").where({ id: userId }).del();
};

exports.doesUserExist = async function (userId) {
    return (await exports.getUserById(userId)) != null;
};

exports.getGroupsWhereUserIsMember = async function (userId) {
    return await DBClient("group").whereIn("id", DBClient("membership").select("group_id").where("user_id", userId));
};

exports.getGroupsWhereUserIsAdministrator = async function (userId) {
    return await DBClient("group").whereIn(
        "id",
        DBClient("administration").select("group_id").where("user_id", userId)
    );
};

exports.getCategories = async function (userId) {
    return await DBClient("category").whereIn(
        "id",
        DBClient("user_category").select("category_id").where("user_id", userId)
    );
};

exports.getSubscribedEvents = async function (userId) {
    return await EventService.applyIncludeFilterToManyEvents(
        await DBClient("event")
            .whereIn("id", DBClient("participation").select("event_id").where("user_id", userId))
            .select(Event.select)
    );
};
