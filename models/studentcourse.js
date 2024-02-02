"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // StudentCourse.belongsTo(models.Student, {
      // foreignKey: "student_id",
      // as: "student",
      // });
      // StudentCourse.belongsTo(models.Course, {
      // foreignKey: "course_id",
      // as: "course",
      // });
    }
  }
  StudentCourse.init(
    {
      student_id: DataTypes.NUMBER,
      course_id: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "StudentCourse",
    }
  );
  return StudentCourse;
};
