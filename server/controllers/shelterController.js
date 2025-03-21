const { Shelter } = require('../models/indexModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// Get all shelters
exports.getAllShelters = async (req, res) => {
    try {
        const shelters = await Shelter.findAll({
            attributes: { exclude: ['password'] }
        });
        return res.status(200).json(shelters);
    } catch (error) {
        console.error('Error fetching shelters:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get shelter by ID
exports.getShelterById = async (req, res) => {
    try {
        const shelter = await Shelter.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });
        if (!shelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }
        return res.status(200).json(shelter);
    } catch (error) {
        console.error('Error fetching shelter:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Register a new shelter
exports.registerShelter = async (req, res) => {
    try {
        const { shelterName, email, phoneNumber, address, nif, password } = req.body;
        // Check if shelter already exists with email or nif
        const existingShelter = await Shelter.findOne({
            where: {
                [Op.or]: [{ email }, { nif }, { phoneNumber }]
            }
        });

        if (existingShelter) {
            return res.status(400).json({ message: 'Shelter with this email, nif, or phone number already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new shelter
        const newShelter = await Shelter.create({
            shelterName,
            email,
            phoneNumber,
            address,
            nif,
            password: hashedPassword,
            isActive: true
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: newShelter.shelterID, email: newShelter.email, isShelter: true },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(201).json({
            message: 'Shelter registered successfully',
            token,
            shelter: {
                id: newShelter.shelterID,
                name: newShelter.shelterName,
                email: newShelter.email
            }
        });
    } catch (error) {
        console.error('Error registering shelter:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Shelter login
exports.loginShelter = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find shelter
        const shelter = await Shelter.findOne({ where: { email } });
        if (!shelter) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if shelter is active
        if (!shelter.isActive) {
            return res.status(401).json({ message: 'Account is deactivated' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, shelter.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: shelter.shelterID, email: shelter.email, isShelter: true },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            message: 'Login successful',
            token,
            shelter: {
                id: shelter.shelterID,
                name: shelter.shelterName,
                email: shelter.email
            }
        });
    } catch (error) {
        console.error('Error logging in shelter:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update shelter profile
exports.updateShelter = async (req, res) => {
    try {
        const shelter = await Shelter.findByPk(req.params.id);
        if (!shelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }
        // If updating password, hash it
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        await shelter.update(req.body);

        // Return updated shelter without password
        const updatedShelter = await Shelter.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }
        });

        return res.status(200).json(updatedShelter);
    } catch (error) {
        console.error('Error updating shelter:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};