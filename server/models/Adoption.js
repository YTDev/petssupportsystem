const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Animal = require("./Animal");
const Shelter = require("./Shelter");

const Adoption = sequelize.define(
  "Adoption",
  {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "userID",
      references: {
        model: User,
        key: "userID",
      },
    },
    animalID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "animalID",
      references: {
        model: Animal,
        key: "animalID",
      },
    },
    shelterID: {
      type: DataTypes.INTEGER,
      field: "shelterID",
      references: {
        model: Shelter,
        key: "shelterID",
      },
    },
    animalName: {
      type: DataTypes.STRING(50),
      field: "animalName",
    },
    userName: {
      type: DataTypes.STRING(50),
      field: "userName",
    },
    shelterName: {
        type: DataTypes.STRING(100),
        field: "shelterName",
    },
    phoneNumber: {
      type: DataTypes.STRING(9),
      allowNull: false,
      unique: false,
      field: "phoneNumber",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false,
      field: "email",
      validate: {
        isEmail: true,
      },
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'address'
    },
    message: {
      type: DataTypes.STRING(1200),
      field: "message",
      allowNull: false,
    }
  },

  {
    tableName: "adoption",
    timestamps: true, // To add the createdAt and updatedAt fields;
  }
);

Adoption.belongsTo(User, {foreignKey: "userID"});
Adoption.belongsTo(Animal, {foreignKey: "animalID"});
Adoption.belongsTo(Shelter, {foreignKey: "shelterID"});

/* User.belongsToMany(Animal, { through: Adoption, foreignKey: "userID" });
Animal.belongsToMany(User, { through: Adoption, foreignKey: "animalID" }); */

module.exports = Adoption;
