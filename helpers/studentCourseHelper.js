const db = require("../models");

const assignStudentToCourse = async (student_id, course_id) => {
  await db.StudentCourse.create({
    student_id,
    course_id,
  });
};

const studentAlreadyMember = async (student_id, course_id) => {
  const result = await db.StudentCourse.findAll({
    where: {
      student_id,
      course_id,
    },
  });

  return Promise.resolve(result);
};

module.exports = { assignStudentToCourse, studentAlreadyMember };
