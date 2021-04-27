const DBClient = require("./DBConnection");
const ErrorResponse = require("../utility/ErrorResponse");

exports.getAllCategories = async function () {
    const categories = await DBClient("category");
    return categories;
};

exports.getCategoryById = async function (categoryId) {
    const categoriesFound = await DBClient("category").where({ id: categoryId });
    return categoriesFound.length == 0 ? null : categoriesFound[0];
};

exports.addNewCategory = async function (category) {
    if (category.title == null || category.title == "")
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Title property cannot be null or empty");
    try {
        const categoryId = await DBClient("category")
            .insert({
                title: category.title,
                description: category.description ?? "No description",
            })
            .returning("id");

        const categoryResponse = await exports.getCategoryById(categoryId[0]);
        return categoryResponse;
    } catch (err) {
        throw new ErrorResponse(ErrorResponse.badRequestStatusCode, "Title already exists");
    }
};
