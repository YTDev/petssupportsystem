const express = require("express");
const router = express.Router();

const {
  addVaccineController,
  getVaccineController,
} = require("../controllers/indexcont");

//CRUD
// Rota para adicionar dados á tabela vaccines
router.post("/addVaccine", addVaccineController.addVaccine);
// Consultar todas as vacinas
router.get("/getVaccine", getVaccineController.getVaccine);

module.exports = router;
