const express = require('express');
const router = express.Router();
const breedController = require('../controllers/breedController');

// Public routes
router.get('/', breedController.getAllBreeds);
router.get('/:id', breedController.getBreedById);
router.get('/species/:speciesID', breedController.getBreedBySpecies);

module.exports = router;