require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');


const db = new Sequelize({
  database: process.env.DATABASE,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  dialect: process.env.DIALECT,
  dialectOption: {
    ssl: {
      require: true,
      rejectUnauthorized: true,
      ca: fs.readFileSync(path.resolve(__dirname, process.env.SSL_CA)).toString(),
    },
  },
});

try {
  db.authenticate();
  console.log("database is connected")
} catch (err) {
  console.log("database is not connected", err)
}

module.exports = db;