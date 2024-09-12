"use strict";

// NODE LIBS
const { Model } = require("sequelize");
// HELPERS
const { hashText } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.UserLevel, {
        foreignKey: "user_level_id",
        as: "user_level",
      });
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
      },
      user_level_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "UserLevel",
          key: "user_level_id",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "user_level_id is required",
          },
          notNull: {
            msg: "user_level_id is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "email is already exist",
        },
        validate: {
          isEmail: {
            msg: "email is not falid",
          },
          notEmpty: {
            args: true,
            msg: "email is required",
          },
          notNull: {
            msg: "email is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "password is required",
          },
          notNull: {
            msg: "password is required",
          },
        },
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user",
      timestamps: false,
      hooks: {
        beforeCreate: (user, opt) => {
          user.password = hashText(user.password);
        },
        beforeUpdate: (user, options) => {
          if (user.changed("password")) {
            user.password = hashText(user.password);
          }
        },
      },
    }
  );
  return User;
};
