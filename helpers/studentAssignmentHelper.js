const Boom = require("boom");
const db = require("../models");
const _ = require("lodash");

const createStudentAssignment = async (data) => {
  await db.StudentAssignment.create({
    student_id: data.student_id,
    assignment_id: data.assignment_id,
  });
};

module.exports = { createStudentAssignment };
