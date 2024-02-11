const Boom = require("boom");
const db = require("../models");
const _ = require("lodash");

const assignStudentToCourse = async (student_id, course_id) => {
  await db.StudentCourse.create({
    student_id,
    course_id,
  });
};

const studentAlreadyMember = async (student_id, course_id) => {
  const result = await db.StudentCourse.findOne({
    where: {
      student_id,
      course_id,
    },
  });

  if (!_.isEmpty(result)) {
    return Promise.reject(Boom.badRequest("Student Already Member"));
  }

  return Promise.resolve(result);
};

module.exports = { assignStudentToCourse, studentAlreadyMember };
