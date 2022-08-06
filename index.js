const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


var bodyParser = require('body-parser');
const db = require('./server');

const { Client } = require("pg");

// (async () => {
//   const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     application_name: "$ docs_quickstart_node"
//   });

//   const statements = [
//     // CREATE the messages table
//     "CREATE TABLE IF NOT EXISTS canvas (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), canvas STRING)",
//     // INSERT a row into the messages table
//     "INSERT INTO messages (message) VALUES ('Hello world!')",
//     // SELECT a row from the messages table
//     "SELECT message FROM messages",
//   ];

//   try {
//     // Connect to CockroachDB
//     await client.connect();
//     for (let n = 0; n < statements.length; n++) {
//       let result = await client.query(statements[n]);
//       if (result.rows[0]) { console.log(result.rows[0].message); }
//     }
//     await client.end();
//   } catch (err) {
//     console.log(`error connecting: ${err}`);
//   }

//   // Exit program
//   process.exit();
// })().catch((err) => console.log(err.stack));

// const cors = require('cors');
// const { response } = require('express');

// app.use(cors());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("./public"));

app.get("/scrapbook", (req, res, next) => {
  res.sendFile(path.join(__dirname, './public/scrapbook.html'));
});
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


app.listen(port, () => {
  console.log(`Server started at port ${port}`);
})
