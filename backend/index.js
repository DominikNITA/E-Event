const express = require('express');
const app = express();

require('dotenv').config()

const events = require("./routes/events")


app.use(express.json())

app.use("/events", events)

app.get('/', (req,res) => {
  res.send('Hello World');
})
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

const hostname = 'localhost';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`DB_USER=${process.env.DB_USER}`)
  console.log(`Server running at http://${hostname}:${port}/`);
});