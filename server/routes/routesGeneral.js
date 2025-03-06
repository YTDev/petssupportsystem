const express = require("express");
const { loginUser } = require("../controllers/login");
const router = express.Router();

const {
  addVaccineController,
  getVaccineController,
  addUserController,
} = require("../controllers/indexcont");

// Routes to add the vaccines
router.post("/addVaccine", addVaccineController.addVaccine);
// Routes to fetch the vaccines
router.get("/getVaccine", getVaccineController.getVaccine);

// Routes to register user
router.post("/addUser", addUserController.addUser);

//Routes to authenticate user login
router.post("/login", loginUser);

module.exports = router;
