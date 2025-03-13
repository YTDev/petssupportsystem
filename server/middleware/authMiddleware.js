const jwt = require('jsonwebtoken');
const { User, Shelter } = require('../models/indexModels');

// Authenticate middleware
exports.authenticate = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token is for a user or shelter
        if (decoded.isShelter) {
            const shelter = await Shelter.findByPk(decoded.id);
            if (!shelter) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.shelter = shelter;
            req.isShelter = true;
        } else {
            const user = await User.findByPk(decoded.id);
            if (!user) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = user;
            req.isAdmin = user.isAdmin;
        }

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Verify if request is from a shelter
exports.verifyShelter = (req, res, next) => {
    if (!req.isShelter) {
        return res.status(403).json({ message: 'Access denied. Shelter account required.' });
    }
    next();
};