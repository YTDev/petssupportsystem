const express = require('express');
const router = express.Router();

// Import all route modules
const animalRoutes = require('./animalRoutes');
const breedRoutes = require('./breedRoutes');
const shelterRoutes = require('./shelterRoutes');
const userRoutes = require('./userRoutes');

// Register routes
router.use('/animals', animalRoutes);
router.use('/breeds', breedRoutes);
router.use('/shelters', shelterRoutes);
router.use('/users', userRoutes);

module.exports = router;