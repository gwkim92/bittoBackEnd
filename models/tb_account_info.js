"use strict";
// const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const AccountInfo = sequelize.define("account_infos", {
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: [0, 50], // This ensures a maximum length of 50
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      // Note: Sequelize doesn't have a trim property, handle trimming at application level before saving.
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [5, 255], // This ensures a minimum length of 5
      },
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    walletPassword: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: [0, 50], // This ensures a maximum length of 50
      },
    },
    walletAddress: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        len: [0, 50], // This ensures a maximum length of 50
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

  return AccountInfo;
};
