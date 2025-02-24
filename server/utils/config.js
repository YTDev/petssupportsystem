//Secret key definition
require("dotenv").config();
JWT_SECRET_KEY = process.env.JWT_SECRET;

module.exports = {
  JWT_SECRET: JWT_SECRET_KEY,
};
