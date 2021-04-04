const express = require('express');
const app = express();

require('dotenv').config()

const eventsRouter = require("./routes/events")
const groupsRouter = require("./routes/groups")
const placesRouter = require("./routes/places")
const usersRouter = require("./routes/users")

app.use(express.json())

app.use("/events", eventsRouter)
app.use("/groups", groupsRouter)
app.use("/places", placesRouter)
app.use("/users", usersRouter)


app.get('/', (req,res) => {
  res.send("Hello World!");
})
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

const hostname = 'localhost';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});