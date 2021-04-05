const express = require('express');
const app = express();

require('dotenv').config()

//Middlewares setup
  //CORS
const cors = require('cors')
app.use(cors())
  //Parse body json format to js object for each route
app.use(express.json())

//Routes/Endpoints setup
const eventsRouter = require("./routes/events")
const groupsRouter = require("./routes/groups")
const placesRouter = require("./routes/places")
const usersRouter = require("./routes/users")
app.use("/events", eventsRouter)
app.use("/groups", groupsRouter)
app.use("/places", placesRouter)
app.use("/users", usersRouter)

const all_routes = require("express-list-endpoints")
app.get('/', (req,res) => {
  res.set('Content-Type', 'text/html');
  // Afficher toutes les endpoints disponibles
  let htmlResponse = "";
  all_routes(app).forEach(route => htmlResponse += `<div>${route.path} - ${route.methods.join(' ')}</div>`)
  res.json(htmlResponse);
})

const hostname = 'localhost';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});