const express = require("express");
const { loginUser } = require("../controllers/login");
const router = express.Router();

const {
  addVaccineController,
  getVaccineController,
  addUserController,
  getAnimalController,
  filterAnimalsController,
  addAnimalController
} = require("../controllers/indexcont");

// Routes to add the vaccines
router.post("/addVaccine", addVaccineController.addVaccine);
// Routes to fetch the vaccines
router.get("/getVaccine", getVaccineController.getVaccine);

// Routes to add the animals
router.post("/addAnimal", addAnimalController.addAnimal);

// Routes to fetch the animals
router.get("/getAnimal", getAnimalController.getAnimal);

// Routes to filter the animals
router.get("/filterAnimals", filterAnimalsController.filterAnimals);

// Routes to register user
router.post("/addUser", addUserController.addUser);

//Routes to authenticate user login
router.post("/login", loginUser);

module.exports = router;
