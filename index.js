const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
var bodyParser = require('body-parser');
var dbName = 'newDB';

const { Client } = require("pg");

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/scrapbook", (req, res, next) => {
  if(req.accepts('html')) {
    res.sendFile(path.join(__dirname, './public/scrapbook.html'));
  }
});

app.post("/", (req, res, next) => {
  (async () => {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      application_name: "$ docs_quickstart_node"
    });
    let title = req.body.title;
    console.log(title);
    
    try {
      let result;
      await client.connect();
      result = await client.query(`SELECT * FROM ${dbName} WHERE title='${title}'`);
      await client.end();
      res.status(200).set("Content-Type", "application/json").json(result.rows[0].canvas);
    } catch (err) {
      console.log(`error connecting: ${err}`);
    }
  })().catch((err) => console.log(err.stack));
});

app.put("/scrapbook", (req, res, next) => {
  (async () => {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      application_name: "$ docs_quickstart_node"
    });

    let request = JSON.stringify(req.body);
    console.log(request);
    const today = new Date();
    const statements = [
      `SELECT id FROM ${dbName} ORDER BY datetime DESC`,
      `INSERT INTO ${dbName} (canvas, datetime) VALUES ('${request}', TIMESTAMP '${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}')`,
      `SELECT canvas FROM ${dbName}`,
    ];
  
    try {
      await client.connect();
      let result = await client.query(`SELECT id FROM ${dbName} ORDER BY datetime DESC LIMIT 1`);
      let id = result.rows[0].id;
      let updateResult = await client.query(`UPDATE ${dbName} SET canvas = '${request}' WHERE id = '${id}'`);
      await client.end();
    } catch (err) {
      console.log(`error connecting: ${err}`);
    }

    res.status(200).send();
  })().catch((err) => console.log(err.stack));
});

app.post("/scrapbook", (req, res, next) => {
  (async () => {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      application_name: "$ docs_quickstart_node"
    });
    let request = req.body.title;
    console.log(request);
    const today = new Date();
    const statements = [
      `CREATE TABLE IF NOT EXISTS ${dbName} (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title STRING, canvas JSONB, datetime TIMESTAMP)`,
      `INSERT INTO ${dbName} (title, datetime) VALUES ('${request}', TIMESTAMP '${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}')`
    ];
  
    try {
      await client.connect();
      for (let n = 0; n < statements.length; n++) {
        let result = await client.query(statements[n]);
      }
      await client.end();
    } catch (err) {
      console.log(`error connecting: ${err}`);
    }

    res.status(200).send();
  })().catch((err) => console.log(err.stack));
});

app.get("/", (req, res, next) => {
  if(req.accepts('html')) {
    res.sendFile(path.join(__dirname, './public/index.html'));
  } else {
    (async () => {
      const client = new Client({
        connectionString: process.env.DATABASE_URL,
        application_name: "$ docs_quickstart_node"
      });
      
      try {
        let result;
        await client.connect();
        result = await client.query(`SELECT title FROM ${dbName}`);
        await client.end();
        console.log(result.rows)
        res.status(200).set("Content-Type", "application/json").json(result.rows);
      } catch (err) {
        console.log(`error connecting: ${err}`);
      }
    })().catch((err) => console.log(err.stack));
  }
});
app.use(express.static("./public"));

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
})
