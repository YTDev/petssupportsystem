const sequelize = require('../config/database');
const Species = require('./Species');
const Breed = require('./Breed');
const Shelter = require('./Shelter');
const User = require('./User');
const Animal = require('./Animal');
const Favorites = require('./Favorites');

const syncDatabase = async() => {
    try {
        await sequelize.sync({});
        console.log("Database synchronized with success.");
    } catch (err) {
        console.log("Error synchronizing database", err.message);
    }
};

module.exports = {
    sequelize,
    syncDatabase,
    Species,
    Shelter,
    Breed,
    User,
    Animal,
    Favorites
};