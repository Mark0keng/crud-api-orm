"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsTo(models.Lecturer, {
        as: "lecturer",
        foreignKey: "lecturer_id",
      });

      Course.belongsToMany(models.Student, {
        through: "studentcourses",
        as: "students",
        foreignKey: "course_id",
      });
    }
  }
  Course.init(
    {
      name: DataTypes.STRING,
      subject: DataTypes.STRING,
      room: DataTypes.STRING,
      description: DataTypes.STRING,
      code: DataTypes.STRING,
      lecturer_id: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
