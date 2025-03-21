const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');
const authMiddleware = require('../middleware/authMiddleware');

//Public routes
router.get('/', animalController.getAllAnimals);
router.get('/filter', animalController.filterAnimals);
router.get('/:id', animalController.getAnimalById);
router.get('/shelter/:shelterID', animalController.getAnimalsByShelter);
router.get('/species/:speciesID', animalController.getAnimalsBySpecies);

// Protected routes (shelter only)
router.post('/', authMiddleware.verifyShelter, animalController.createAnimal);
router.put('/:id', authMiddleware.verifyShelter, animalController.updateAnimal);
router.delete('/:id', authMiddleware.verifyShelter, animalController.deleteAnimal);

module.exports = router;