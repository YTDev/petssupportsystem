const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected routes (user only)
router.get('/email/:email', authMiddleware.authenticate, userController.getUserByEmail);
router.put('/:id', authMiddleware.authenticate, userController.updateUser);
router.get('/:id/favorites', authMiddleware.authenticate, userController.getUserFavorites);
router.post('/favorites', authMiddleware.authenticate, userController.addToFavorites);
router.delete('/favorites/:userID/:animalID', authMiddleware.authenticate, userController.removeFromFavorites);

module.exports = router;