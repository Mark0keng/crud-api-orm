"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Assignment.belongsTo(models.Course, {
        as: "course",
        foreignKey: "course_id",
      });

      Assignment.belongsToMany(models.Student, {
        through: "studentassignments",
        as: "students",
        foreignKey: "assignment_id",
      });
    }
  }
  Assignment.init(
    {
      name: DataTypes.STRING,
      instruction: DataTypes.TEXT,
      dueDate: DataTypes.DATE,
      course_id: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Assignment",
    }
  );
  return Assignment;
};
