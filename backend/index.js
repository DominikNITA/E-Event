const express = require("express");
const app = express();

require("dotenv").config();

const hostname = "localhost";
const port = 3000;

//Middlewares setup
//CORS
// const cors = require("cors");
// app.use(cors());
// OR
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
//Parse body json format to js object for each route
app.use(express.json());

//Setup swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-Event Backend",
            version: "1.0.0",
        },
    },
    apis: ["./routes/*.js"], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    // Afficher toutes les endpoints disponibles
    let htmlResponse = "";
    res.send(
        `Go to <a href="http://${hostname}:${port}/api-docs?tryItOutEnabled=true">http://${hostname}:${port}/api-docs</a> to see the server documentation`
    );
});

//Routes/Endpoints setup
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);
const { authenticateToken } = require("./utility/Middlewares");
app.use(authenticateToken);

const eventsRouter = require("./routes/events");
const groupsRouter = require("./routes/groups");
const placesRouter = require("./routes/places");
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
app.use("/events", eventsRouter);
app.use("/groups", groupsRouter);
app.use("/places", placesRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);

//Error handling
const ErrorResponse = require("./utility/ErrorResponse");
app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof ErrorResponse) {
        res.status(err.statusCode).send(err.message);
    } else {
        res.status(500).send("Unknown error on the server");
    }
});



// Launch server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
