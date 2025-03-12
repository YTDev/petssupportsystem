const jwt = require('jsonwebtoken');
const { User, Shelter } = require('../models');

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
            const verifyShelter = await Shelter.findByPk(decoded.id);
            if (!verifyShelter) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.shelter = verifyShelter;
            req.isShelter = true;
        } else {
            const verifyUser = await User.findByPk(decoded.id);
            if (!verifyUser) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = verifyUser;
            req.isAdmin = verifyUser.isAdmin;
        }

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// // Is admin middleware
// exports.isAdmin = (req, res, next) => {
//     if (!req.isAdmin) {
//         return res.status(403).json({ message: 'Access denied. Admin required.' });
//     }
//     next();
// };