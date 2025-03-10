const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    userID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'userID'
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'name'
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'email',
        validate: {
            isEmail: true
        }
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'address'
    },
    phoneNumber: {
        type: DataTypes.STRING(9),
        allowNull: false,
        field: 'phoneNumber'
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'password'
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'isAdmin'
    },
    isActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'isActive'
    }
}, {
    tableName: 'user',
    timestamps: false
});

module.exports = User;