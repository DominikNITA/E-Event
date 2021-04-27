const DBClient = require("./DBConnection");
const ErrorResponse = require("../utility/ErrorResponse");

exports.getAllCategories = async function () {
    const categories = await DBClient("category");
    return categories;
};
