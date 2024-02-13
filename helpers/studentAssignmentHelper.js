const Boom = require("boom");
const db = require("../models");
const _ = require("lodash");

const getStudentAssignment = async (student_id, assignment_id) => {
  const result = await db.StudentAssignment.findOne({
    attributes: ["student_id", "assignment_id", "fileSubmit"],
    where: {
      student_id,
      assignment_id,
    },
  });

  if (_.isEmpty(result)) {
    return Promise.reject(Boom.notFound("Student Assignment Not Found"));
  }

  return Promise.resolve(result.dataValues);
};

const createStudentAssignment = async (data) => {
  await db.StudentAssignment.create({
    student_id: data.student_id,
    assignment_id: data.assignment_id,
  });
};

const updateStudentAssignment = async (data) => {
  await db.StudentAssignment.update(
    {
      student_id: data.student_id,
      assignment_id: data.assignment_id,
      fileSubmit: data.fileSubmit,
    },
    {
      where: {
        student_id: data.student_id,
        assignment_id: data.assignment_id,
      },
    }
  );
};

module.exports = {
  getStudentAssignment,
  createStudentAssignment,
  updateStudentAssignment,
};
