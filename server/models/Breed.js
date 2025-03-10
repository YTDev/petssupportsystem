const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Species = require('./Species');

const Breed = sequelize.define('Breed', {
    breedID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'breedID'
    },
    breedName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: 'breedName'
    },
    speciesID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'speciesID',
        references: {
            model: Species,
            key: 'speciesID'
        }
    }
}, {
    tableName: 'breed',
    timestamps: false
});

// Define relationship
Breed.belongsTo(Species, { foreignKey: 'speciesID' });
Species.hasMany(Breed, { foreignKey: 'speciesID' });

module.exports = Breed;