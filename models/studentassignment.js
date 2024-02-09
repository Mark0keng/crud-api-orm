"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentAssignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  StudentAssignment.init(
    {
      student_id: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      fileSubmit: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StudentAssignment",
    }
  );
  return StudentAssignment;
};
