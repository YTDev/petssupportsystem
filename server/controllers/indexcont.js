const addVaccineController = require("./vaccines/addVaccine");
const getVaccineController = require("./vaccines/getVaccine");
const addUserController = require("./user/addUser");
const loginUser = require("./login");
module.exports = {
  addVaccineController,
  getVaccineController,
  addUserController,
  loginUser,
};
