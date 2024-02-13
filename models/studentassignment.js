"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentAssignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentAssignment.belongsTo(models.Student, {
        as: "student",
        foreignKey: "student_id",
      });

      StudentAssignment.belongsTo(models.Assignment, {
        as: "assignment",
        foreignKey: "assignment_id",
      });
    }
  }
  StudentAssignment.init(
    {
      student_id: DataTypes.INTEGER,
      assignment_id: DataTypes.INTEGER,
      fileSubmit: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StudentAssignment",
    }
  );
  return StudentAssignment;
};
