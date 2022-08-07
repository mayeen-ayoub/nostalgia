// // const { Pool } = require('pg');
// // const Sequelize = require('sequelize-cockroachdb');

// // const pool = new Pool({
// //   username: 'mayeen',
// //   password: 'qpmEu1PlSXUObctkjHjzag',
// //   host: 'free-tier14.aws-us-east-1.cockroachlabs.cloud',
// //   port: 26257,
// //   database: 'defaultdb',
// //   dialectOptions: {
// //     ssl: {

// //     },
// //   },
// //   logging: false,
// // });

// // const Users = pool.query('CREATE TABLE users ( id INT PRIMARY KEY, name STRING )');

// // const Users = sequelize.define('users', {
// //   id: {
// //     type: Sequelize.INTEGER,
// //     autoIncrement: true,
// //     primaryKey: true,
// //   },
// //   name: {
// //     type: Sequelize.TEXT,
// //   }
// // })

// // const getUsers = (req, res) => {
// //   // Users.sync({
// //   //   force: false,
// //   // })
// //   // .then(() => {
// //   //   return Users.finalAll();
// //   // })
// //   // .then(() => {
// //   //   res.send(users);
// //   // })
// //   pool.query('SELECT * FROM users'), (err, result) => {
// //     if (err) {
// //       throw error;
// //     }
// //     res.status(200).json(results.rows)
// //   }
// // }

// const { Client } = require("pg");

// // const

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

// module.exports = {
//   getUsers
// }
