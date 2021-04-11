const ErrorResponse = require("./ErrorResponse");

const jwt = require("jsonwebtoken");

const UserService = require("../services/UserService");

async function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers["auth"];
        const token = authHeader; // && authHeader.split(' ')[1] //uncomment when using Bearer token
        if (token == null) {
            //throw new ErrorResponse(ErrorResponse.unauthorizedStatusCode, "Auth token not passed");
            console.log("AuthToken not passed. TODO: uncomment error section");
            return next();
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, userFromToken) => {
            if (err) throw new ErrorResponse(ErrorResponse.forbiddenStatusCode, "Problem with token");
            const user = await UserService.getUserById(userFromToken.userId);
            if (user == null)
                throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Token signed for not existing user");
            req.user = user;
            next();
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { authenticateToken };
