const express = require("express");
const router = express.Router();
const adoptionController = require("../controllers/adoptionController");
const authMiddleware = require("../middleware/authMiddleware");

//Public routes (Momentarily)
router.get("/allAdoptions", adoptionController.getAllAdoptionRequests);

//Protected
router.get(
  "/userAdoptions/:userID",
  adoptionController.getUserAdoptionRequests
);
router.post("/createAdoption", adoptionController.createAdoptionRequest);
router.delete(
  "/removeAdoption/:userID/:animalID",
  authMiddleware.authenticate,
  adoptionController.removeAdoptionRequest
);

module.exports = router;
