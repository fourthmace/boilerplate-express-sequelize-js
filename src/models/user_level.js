"use strict";

// NODE LIBS
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserLevel extends Model {
    static associate(models) {}
  }
  UserLevel.init(
    {
      user_level_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "level name is already exist",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "level name is required",
          },
          notNull: {
            msg: "level name is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "UserLevel",
      tableName: "user_level",
      timestamps: false,
      hooks: {},
    }
  );
  return UserLevel;
};
