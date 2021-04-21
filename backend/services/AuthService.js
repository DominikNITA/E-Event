const DBClient = require("./DBConnection");

const ErrorResponse = require("../utility/ErrorResponse");

const crypto = require("crypto");

const jwt = require("jsonwebtoken");

const UserService = require("./UserService");

function getHash(password) {
    return crypto.createHmac("sha256", process.env.HASHING_SECRET).update(password).digest("hex");
}

function validatePassword(password) {
    if (!password) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Password not passed!");
    }
    if (password.length < 5) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Password is too short");
    }
    if (password.length > 64) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Password is too long");
    }
}

function validateEmail(email) {
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Invalid email format");
    }
}

exports.verifyCredentials = async function (email, password) {
    if (email == null || password == null) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Password or email not passed!");
    }

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

exports.registerUser = async function (user, password) {
    if (!user || !user.firstName || !user.lastName || !user.nick || !user.email || !password) {
        console.log(user);
        console.log(password);
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Invalid user content!");
    }

    validatePassword(password);
    validateEmail(user.email);

    //Check if email is available
    if ((await DBClient("user").where({ email: user.email }).first()) != null) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Email already taken!");
    }
    //Check if nick is available
    if ((await DBClient("user").where({ nick: user.nick }).first()) != null) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Nickname already taken!");
    }

    const userResponse = await UserService.addUser(user);
    try {
        await DBClient("authdata").insert({
            user_id: userResponse.id,
            password_hash: getHash(password),
        });
    } catch (err) {
        //Remove user if problems with adding password occur
        await UserService.removeUser(userResponse.id);
        throw new Error();
    }

    return userResponse;
};

exports.generateAccessToken = async function (userId) {
    return jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET);
};

exports.changePassword = async function (password, userId) {
    validatePassword(password);

    await DBClient("authdata")
        .where({ user_id: userId })
        .update({
            password_hash: getHash(password),
        });

    return this.generateAccessToken(userId);
};

exports.demandPasswordRecovery = async function (email) {
    //Validate email
    if (!email) throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Email not passed");
    validateEmail(email);

    //Check email existence
    const user = await UserService.getUserByEmail(email);
    if (!user) return;

    //Create secret key
    const recoveryToken = jwt.sign({ userId: user.id }, process.env.RECOVERY_PASSWORD_SECRET, {
        expiresIn: "1h",
    });

    //TODO: Send recovery token via email
};

exports.recoverPassword = async function (recoveryToken, password) {
    jwt.verify(recoveryToken, process.env.RECOVERY_PASSWORD_SECRET, async (err, decodedToken) => {
        if (err) throw new ErrorResponse(ErrorResponse.forbiddenStatusCode, "Problem with token: " + err.message);

        const user = await UserService.getUserById(decodedToken.userId);
        if (user == null)
            throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Token signed for not existing user");

        this.changePassword(password, user.id);
        //TODO: make recoverytokens only one time use
    });
};
