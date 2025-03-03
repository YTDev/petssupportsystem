const addVaccineController = require("./vaccines/addVaccine");
const getVaccineController = require("./vaccines/getVaccine");
const addAnimalController = require("./animals/addAnimal");
const getAnimalController = require("./animals/getAnimal");
const filterAnimals = require("./animals/filterAnimals");
const addUserController = require("./user/addUser");
const loginUser = require("./login");
const { getAnimal } = require("./animals/getAnimal");

module.exports = {
  addVaccineController,
  getVaccineController,
  addAnimalController,
  getAnimalController,
  filterAnimals,
  addUserController,
  loginUser,
};
