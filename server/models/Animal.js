const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Species = require('./Species');
const Breed = require('./Breed');
const Shelter = require('./Shelter');

const Animal = sequelize.define('Animal', {
    animalID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'animalID'
    },
    animalName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'animalName'
    },
    speciesID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'speciesID',
        references: {
            model: Species,
            key: 'speciesID'
        }
    },
    breedID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'breedID',
        references: {
            model: Breed,
            key: 'breedID'
        }
    },
    shelterID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'shelterID',
        references: {
            model: Shelter,
            key: 'shelterID'
        }
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false,
        field: 'gender'
    },
    size: {
        type: DataTypes.ENUM('Small', 'Medium', 'Big'),
        field: 'size'
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'birthDate'
    },
    status: {
        type: DataTypes.ENUM('Available', 'Pending'),
        defaultValue: 'Available',
        field: 'status'
    },
    animalDescription: {
        type: DataTypes.STRING(500),
        allowNull: false,
        field: 'animalDescription'
    },
    isVaccinated: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'isVaccinated'
    },
    joinDate: {
        type: DataTypes.DATE,
        field: 'joinDate'
    },
    imageUrl: {
        type: DataTypes.STRING(512),
        field: 'imageUrl'
    }
}, {
    tableName: 'animal',
    timestamps: false
});

// Define relationships
Animal.belongsTo(Species, { foreignKey: 'speciesID' });
Animal.belongsTo(Breed, { foreignKey: 'breedID' });
Animal.belongsTo(Shelter, { foreignKey: 'shelterID' });

Species.hasMany(Animal, { foreignKey: 'speciesID' });
Breed.hasMany(Animal, { foreignKey: 'breedID' });
Shelter.hasMany(Animal, { foreignKey: 'shelterID' });

module.exports = Animal;