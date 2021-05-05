const DBClient = require("./DBConnection");

const Group = require("../models/Groupe");

const EventService = require("./EventService");

const UserService = require("./UserService");

const { minimalView } = require("../models/User");

const ErrorResponse = require("../utility/ErrorResponse");

exports.getAllGroups = async function () {
    return await DBClient("group");
};

exports.getGroupById = async function (groupId) {
    //Do not do group validation here with checkIfGroupExists(), because it would create infinite loop

    const groupResponse = await DBClient("group").where({ id: groupId }).select(Group.select);
    return groupResponse.length == 0 ? null : groupResponse[0];
};

exports.getMembers = async function (groupId) {
    checkIfGroupExists(groupId);

    return await DBClient("user")
        .whereIn("id", DBClient("membership").select("user_id").where("group_id", groupId))
        .select(minimalView);
};

exports.addMember = async function (userId, groupId) {
    checkIfUserExists(userId);
    checkIfGroupExists(groupId);
    if (this.isMember(userId, groupId)) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "User already in the group");
    }

    await DBClient("membership").insert({ user_id: userId, group_id: groupId });
    return await this.getMembers(groupId);
};

exports.removeMember = async function (userId, groupId) {
    checkIfUserExists(userId);
    checkIfGroupExists(groupId);
    if (!this.isMember(userId, groupId)) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "User is not in the group");
    }

    //TODO: Check credentials to check if caller can remove person from the group

    await DBClient("membership").where({ user_id: userId, group_id: groupId }).del();
    await DBClient("administration").where({ user_id: userId, group_id: groupId }).del();
    return await this.getMembers(groupId);
};

exports.getAdministrators = async function (groupId) {
    checkIfGroupExists(groupId);

    return await DBClient("user")
        .whereIn("id", DBClient("administration").select("user_id").where("group_id", groupId))
        .select(minimalView);
};

exports.addAdministrator = async function (userId, groupId) {
    checkIfUserExists(userId);
    checkIfGroupExists(groupId);
    if (this.isAdministrator(userId, groupId)) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "User is already an administrator");
    }

    //TODO: Check if user has rights to add new administrator

    await DBClient("administration").insert({ user_id: userId, group_id: groupId });
    return await this.getAdministrators(groupId);
};

exports.removeAdministrator = async function (userId, groupId) {
    checkIfUserExists(userId);
    checkIfGroupExists(groupId);
    if (!this.isAdministrator(userId, groupId)) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "User is not the administrator of the group");
    }

    //TODO: Check credentials to check if caller can remove person from the administrator role

    await DBClient("administration").where({ user_id: userId, group_id: groupId }).del();
    return await this.getAdministrators(groupId);
};

exports.getGroupsEvents = async function (groupId) {
    checkIfGroupExists(groupId);

    const groupsEvents = await DBClient("event").where({ organizer_id: groupId });
    return groupsEvents;
};

exports.addEventToGroup = async function (groupId, event) {
    checkIfGroupExists(groupId);

    // I don't like it... to check again @Dom
    event.organizer.id = groupId;
    return await EventService.addEvent(event);
};

exports.doesGroupExist = async function (groupId) {
    // Do not call checkIfGroupExists -> Infinite call loop :(
    return (await this.getGroupById(groupId)) != null;
};

exports.isAdministrator = async function (userId, groupId) {
    checkIfUserExists(userId);
    checkIfGroupExists(groupId);

    return (await DBClient("administration").where({ user_id: userId, group_id: groupId })).length > 0;
};

exports.isMember = async function (userId, groupId) {
    checkIfUserExists(userId);
    checkIfGroupExists(groupId);

    return (await DBClient("membership").where({ user_id: userId, group_id: groupId })).length > 0;
};

// Validations

/**Maybe move it to the UserService? */
async function checkIfUserExists(userId) {
    if ((await UserService.doesUserExist(userId)) == false) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, `User with id ${userId} does not exist`);
    }
}

async function checkIfGroupExists(groupId) {
    if ((await exports.doesGroupExist(groupId)) == false) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, `Group with id ${groupId} does not exist`);
    }
}
