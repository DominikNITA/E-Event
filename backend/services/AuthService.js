const DBClient = require("./DBConnection");

const ErrorResponse = require("../utility/ErrorResponse");

const crypto = require("crypto");

function getHash(password) {
    return crypto.createHmac("sha256", process.env.HASHING_SECRET).update(password).digest("hex");
}

function validatePassword(password) {
    if (password.length < 5) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Password is too short");
    } else if (password.length > 64) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Password is too long");
    }
}

function validateEmail(email) {
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Invalid email format");
    }
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

exports.registerUser = async function (user) {
    if (!user || !user.firstName || !user.lastName || !user.nick || !user.email || !user.password) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Invalid user content!");
    }
    validatePassword(user.password);
    validateEmail(user.email);
    //Check if email is available
    if ((await DBClient("user").where({ email: user.email }).first()) != null) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Email already taken!");
    }
    //Check if nick is available
    if ((await DBClient("user").where({ nick: user.nick }).first()) != null) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Nickname already taken!");
    }
    const userId = (await DBClient("user")
        .insert({
            first_name: user.firstName,
            last_name: user.lastName,
            nick: user.nick,
            entity: user.entity ?? "None",
            email: user.email,
        })
        .returning("id"))[0];
    console.log(userId);
    try {
        await DBClient("authdata").insert({
            user_id: userId,
            password_hash: getHash(user.password),
        });
    } catch (err) {
        //Remove user if problems with adding password occur
        await DBClient("user").where({ id: userId }).del();
        throw new Error();
    }

    return await DBClient("user").where({ id: userId }).first();
};
