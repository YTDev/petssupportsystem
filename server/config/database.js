require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

console.log('Environment variables:');
console.log('DB_NAME:', process.env.DB_DATABASE);
console.log('DB_USERNAME:', process.env.DB_USERNAME ? '[SET]' : '[NOT SET]');
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '[SET]' : '[NOT SET]');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);

const db = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      ssl: process.env.DB_SSL_ENABLED === 'true' ? {
        require: true,
        rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
        ca: process.env.DB_SSL_CA ?
          fs.readFileSync(path.resolve(__dirname, process.env.DB_SSL_CA)).toString() :
          undefined,
      } : false,
    },
    pool: {
      max: parseInt(process.env.DB_POOL_MAX || '5', 10),
      min: parseInt(process.env.DB_POOL_MIN || '0', 10),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE || '30000', 10),
      idle: parseInt(process.env.DB_POOL_IDLE || '10000', 10)
    },
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
  },
);

const  connectDatabase = async () => {
  try {
    await db.authenticate();
    console.log("Database connection established");
    return true;
  } catch (err) {
    console.log("Database connection failed", err.message);
    return false;
  }
};

connectDatabase();

module.exports = db;