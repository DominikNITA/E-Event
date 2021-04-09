const DBClient = require("./DBConnection");

const ErrorResponse = require("../utility/ErrorResponse");

const crypto = require("crypto");

function getHash(password) {
    return crypto.createHmac("sha256", process.env.HASHING_SECRET).update(password).digest("hex");
}

exports.verifyCredentials = async function (email, password) {
    const user = await DBClient("user").where({ email: email }).first();
    if (user == null) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Password or email not valid!");
    }
    const userId = user.id;
    const hash = getHash(password);
    const userHash = await DBClient("authdata")
        .where({ user_id: userId })
        .select("password_hash as passwordHash")
        .first();
    if (userHash == null) {
        throw new ErrorResponse(
            ErrorResponse.internalServerError,
            "Password not found! Contact administrator for help"
        );
    }
    console.log(hash);
    console.log(userHash);
    if (hash != userHash.passwordHash) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Password or email not valid!");
    }
    return userId;
};
