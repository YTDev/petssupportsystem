const { User, Animal, Favorites, Species, Breed, Shelter } = require('../models/indexModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// Get user by Email
exports.getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({
            where: {email},
            attributes: { exclude: ['password'] }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, address, phoneNumber, password, isAdmin = false } = req.body;
        //Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            address,
            phoneNumber,
            password: hashedPassword,
            isAdmin,
            isActive: 1
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser.userID, email: newUser.email, isAdmin: newUser.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.userID,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// User login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(401).json({ message: 'Account is deactivated' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.userID, email: user.email, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.userID,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update user profile
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // If updating password, hash it
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        await user.update(req.body);

        // Return updated user without password
        const updatedUser = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get user favorites
exports.getUserFavorites = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            include: [
                {
                    model: Animal,
                    through: { attributes: [] }, // Don't include join table data
                    include: [
                        { model: Species },
                        { model: Breed },
                        { model: Shelter, attributes: { exclude: ['password'] } }
                    ]
                }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user.Animals);
    } catch (error) {
        console.error('Error fetching user favorites:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Add animal to favorites
exports.addToFavorites = async (req, res) => {
    try {
        const { userID, animalID } = req.body;
        // Check if user and animal exist
        const user = await User.findByPk(userID);
        const animal = await Animal.findByPk(animalID);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        // Check if already in favorites
        const favorite = await Favorites.findOne({
            where: { userID, animalID }
        });

        if (favorite) {
            return res.status(400).json({ message: 'Animal already in favorites' });
        }

        // Add to favorites
        await Favorites.create({ userID, animalID });

        return res.status(201).json({ message: 'Animal added to favorites' });
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Remove animal from favorites
exports.removeFromFavorites = async (req, res) => {
    try {
        const { userID, animalID } = req.params;
        // Check if in favorites
        const favorite = await Favorites.findOne({
            where: { userID, animalID }
        });

        if (!favorite) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        // Remove from favorites
        await favorite.destroy();

        return res.status(200).json({ message: 'Animal removed from favorites' });
    } catch (error) {
        console.error('Error removing from favorites:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};