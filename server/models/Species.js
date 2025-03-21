const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Species = sequelize.define('Species', {
    speciesID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'speciesID'
    },
    speciesName: {
        type: DataTypes.STRING(100),
        field:'speciesName'
    }
},{
    tableName:'species',
    timestamps: false //Tabela sem timestamps
});

module.exports = Species;