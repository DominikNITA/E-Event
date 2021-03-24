const express = require('express');
const app = express();

const hostname = 'localhost';
const port = 3000;


app.use(express.json())

app.get('/', (req,res) => {
  res.send('Hello World');
})
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});