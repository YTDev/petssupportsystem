const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Shelter = sequelize.define('Shelter', {
    shelterID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'shelterID'
    },
    shelterName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'shelterName'
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
        field: 'email'
    },
    phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        field: 'phoneNumber'
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'address'
    },
    nif: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        field: 'nif'
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'password'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'isActive'
    },
    longitude: {
        type: DataTypes.DECIMAL(10, 7),
        field: 'longitude'
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 7),
        field: 'latitude'
    }
}, {
    tableName: 'shelter',
    timestamps: false
})

module.exports = Shelter;