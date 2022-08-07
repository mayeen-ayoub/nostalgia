const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


var bodyParser = require('body-parser');
const db = require('./server');

const { Client } = require("pg");
const { Console } = require('console');

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

//   Exit program
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

// app.use('/canvas');

app.use(express.static("./public"));

app.get("/scrapbook", (req, res, next) => {
  if(req.accepts('html')) {
    res.sendFile(path.join(__dirname, './public/scrapbook.html'));
  } else {
    (async () => {
      const client = new Client({
        connectionString: process.env.DATABASE_URL,
        application_name: "$ docs_quickstart_node"
      });
      let request = JSON.stringify(req.body);
      console.log(request);
      
      // const statements = [
      //   // CREATE the messages table
      //   "CREATE TABLE IF NOT EXISTS canvasesss (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), canvas JSONB, datetime TIMESTAMP)",
      //   // INSERT a row into the messages table
      //   `INSERT INTO canvasesss (canvas, datetime) VALUES ('${request}', TIMESTAMP '${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}')`,
      //   // SELECT a row from the messages table
      //   "SELECT canvas FROM canvasesss",
      // ];
    
      try {
        let result;
        // Connect to CockroachDB
        await client.connect();
        // for (let n = 0; n < statements.length; n++) {
          result = await client.query("SELECT * FROM canvasesss ORDER BY datetime DESC");
          // if (result.rows[0]) { console.log(result.rows[0].canvas); }
        // }
        await client.end();
        res.status(200).set("Content-Type", "application/json").json(result.rows[0].canvas);
      } catch (err) {
        console.log(`error connecting: ${err}`);
      }
    
      
    })().catch((err) => console.log(err.stack));
  }
});

app.post("/scrapbook", (req, res, next) => {
  (async () => {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      application_name: "$ docs_quickstart_node"
    });
    let request = JSON.stringify(req.body);
    console.log(request);
    const today = new Date();
    const statements = [
      // CREATE the messages table
      "CREATE TABLE IF NOT EXISTS canvasesss (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), canvas JSONB, datetime TIMESTAMP)",
      // INSERT a row into the messages table
      `INSERT INTO canvasesss (canvas, datetime) VALUES ('${request}', TIMESTAMP '${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}')`,
      // SELECT a row from the messages table
      "SELECT canvas FROM canvasesss",
    ];
  
    try {
      // Connect to CockroachDB
      await client.connect();
      for (let n = 0; n < statements.length; n++) {
        let result = await client.query(statements[n]);
        if (result.rows[0]) { console.log(result.rows[0].canvas); }
      }
      await client.end();
    } catch (err) {
      console.log(`error connecting: ${err}`);
    }
  
    // Exit program
    res.status(200).send();
  })().catch((err) => console.log(err.stack));
});

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});


app.listen(port, () => {
  console.log(`Server started at port ${port}`);
})
