const Boom = require("boom");
const db = require("../models");
const _ = require("lodash");

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

const uploadFile = async () => {};

module.exports = { createStudentAssignment, updateStudentAssignment };
