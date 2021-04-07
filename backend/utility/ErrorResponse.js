module.exports = class ErrorResponse extends Error{
    constructor(statusCode, message){
        super(message ?? "Unknown server error");
        this.statusCode = statusCode ?? 500;
    }
    //Status codes https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    static badRequestStatusCode = 400;
    static unauthorizedStatusCode = 401;
    static forbiddenStatusCode = 403;
    static notFoundStatusCode = 404;
    static internalServerError = 500;
}