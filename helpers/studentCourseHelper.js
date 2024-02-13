const Boom = require("boom");
const db = require("../models");
const _ = require("lodash");

const createStudentCourse = async (student_id, course_id) => {
  await db.StudentCourse.create({
    student_id,
    course_id,
  });
};

const getStudentCourse = async (student_id, course_id) => {
  const result = await db.StudentCourse.findOne({
    where: {
      student_id,
      course_id,
    },
  });

  return Promise.resolve(result);
};

const deleteStudentCourse = async (student_id, course_id) => {
  const studentCourse = await getStudentCourse(student_id, course_id);
  if (_.isEmpty(studentCourse)) {
    return Promise.reject(Boom.badRequest("Record not found"));
  }

  await db.StudentCourse.destroy({
    where: {
      student_id,
      course_id,
    },
  });

  return Promise.resolve(true);
};

module.exports = {
  createStudentCourse,
  getStudentCourse,
  deleteStudentCourse,
};
