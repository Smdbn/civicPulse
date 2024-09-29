const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Report = sequelize.define(
  "Report",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Resolved"),
      defaultValue: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Report;
