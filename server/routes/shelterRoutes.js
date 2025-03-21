const express = require('express');
const router = express.Router();
const shelterController = require('../controllers/shelterController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', shelterController.getAllShelters);
router.get('/:id', shelterController.getShelterById);
router.post('/register', shelterController.registerShelter);
router.post('/login', shelterController.loginShelter);

// Protected routes (shelter only) update shelter
router.put('/:id', authMiddleware.authenticate, shelterController.updateShelter);

module.exports = router;