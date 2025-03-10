const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Animal = require('./Animal');
const Favorites = sequelize.define('Favorites', {
    userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'userID',
        references: {
            model: User,
            key: 'userID'
        }
    },
    animalID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'animalID',
        references: {
            model: Animal,
            key: 'animalID'
        }
    }
}, {
    tableName: 'favorites',
    timestamps: false
});

// Define relationships
User.belongsToMany(Animal, { through: Favorites, foreignKey: 'userID' });
Animal.belongsToMany(User, { through: Favorites, foreignKey: 'animalID' });

module.exports = Favorites;