const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const AuthService = require("../services/AuthService");
const ErrorResponse = require("../utility/ErrorResponse");

router.post("/login", async (req, res, next) => {
    try {
        if (req.body.email == null || req.body.password == null) {
            throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Password or email not passed!");
        }
        const userId = await AuthService.verifyCredentials(req.body.email, req.body.password);
        const accessToken = jwt.sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
