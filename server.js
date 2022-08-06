const { Pool } = require('pg');
// const Sequelize = require('sequelize-cockroachdb');

const pool = new Pool({
  username: 'mayeen',
  password: 'qpmEu1PlSXUObctkjHjzag',
  host: 'free-tier14.aws-us-east-1.cockroachlabs.cloud',
  port: 26257,
  database: 'defaultdb',
  dialectOptions: {
    ssl: {

    },
  },
  logging: false,
});

// const Users = pool.query('CREATE TABLE users ( id INT PRIMARY KEY, name STRING )');

// const Users = sequelize.define('users', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   name: {
//     type: Sequelize.TEXT,
//   }
// })

const getUsers = (req, res) => {
  // Users.sync({
  //   force: false,
  // })
  // .then(() => {
  //   return Users.finalAll();
  // })
  // .then(() => {
  //   res.send(users);
  // })
  pool.query('SELECT * FROM users'), (err, result) => {
    if (err) {
      throw error;
    }
    res.status(200).json(results.rows)
  }
}

module.exports = {
  getUsers
}
