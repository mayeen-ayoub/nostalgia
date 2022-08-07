const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
var bodyParser = require('body-parser');

const { Client } = require("pg");

// app.use(cors());
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
      result = await client.query(`SELECT * FROM canvasessss WHERE title='${title}'`);
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

    // const client1 = new Client({
    //   connectionString: process.env.DATABASE_URL,
    //   application_name: "$ docs_quickstart_node"
    // });
    let request = JSON.stringify(req.body);
    console.log(request);
    const today = new Date();
    const statements = [
      // "CREATE TABLE IF NOT EXISTS canvasesss (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title STRING, canvas JSONB, datetime TIMESTAMP)",
      "SELECT id FROM canvasessss ORDER BY datetime DESC",
      `INSERT INTO canvasessss (canvas, datetime) VALUES ('${request}', TIMESTAMP '${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}')`,
      "SELECT canvas FROM canvasessss",
    ];
  
    try {
      await client.connect();
      // for (let n = 0; n < statements.length; n++) {
        let result = await client.query("SELECT id FROM canvasessss ORDER BY datetime DESC LIMIT 1");
        let id = result.rows[0].id;
        // console.log(id);
      // await client.end();
      // await client1.connect();
        // let updateResult = await client.query(`UPDATE canvasessss SET canvas = '${request}' WHERE id = '786754c9-09be-436f-9c8f-7c0f4cb5df66'`);
        let updateResult = await client.query(`UPDATE canvasessss SET canvas = '${request}' WHERE id = '${id}'`);
        // let test = await client.query(`SELECT * FROM canvasessss WHERE id = '${id}'`);
        // console.log(test)
        // console.log(id.rows[0].id);
        // if (result.rows[0]) { console.log(result.rows[0].canvas); }

      // }
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
      "CREATE TABLE IF NOT EXISTS canvasessss (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), title STRING, canvas JSONB, datetime TIMESTAMP)",
      `INSERT INTO canvasessss (title, datetime) VALUES ('${request}', TIMESTAMP '${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}')`
    ];
  
    try {
      await client.connect();
      for (let n = 0; n < statements.length; n++) {
        let result = await client.query(statements[n]);
        // if (result.rows[0]) { console.log(result.rows[0].title); }
      }
      await client.end();
    } catch (err) {
      console.log(`error connecting: ${err}`);
    }

    res.status(200).send();
  })().catch((err) => console.log(err.stack));
});

// app.post("/scrapbook", (req, res, next) => {
//   (async () => {
//     const client = new Client({
//       connectionString: process.env.DATABASE_URL,
//       application_name: "$ docs_quickstart_node"
//     });
//     let request = JSON.stringify(req.body);
//     console.log(request);
//     const today = new Date();
//     const statements = [
//       "CREATE TABLE IF NOT EXISTS canvasesss (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), canvas JSONB, datetime TIMESTAMP)",
//       `INSERT INTO canvasesss (canvas, datetime) VALUES ('${request}', TIMESTAMP '${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}')`,
//       "SELECT canvas FROM canvasesss",
//     ];
  
//     try {
//       await client.connect();
//       for (let n = 0; n < statements.length; n++) {
//         let result = await client.query(statements[n]);
//         if (result.rows[0]) { console.log(result.rows[0].canvas); }
//       }
//       await client.end();
//     } catch (err) {
//       console.log(`error connecting: ${err}`);
//     }

//     res.status(200).send();
//   })().catch((err) => console.log(err.stack));
// });

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
        result = await client.query(`SELECT title FROM canvasessss`);
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
