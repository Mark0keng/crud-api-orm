const Boom = require("boom");
const db = require("../models");
const _ = require("lodash");

const getAssignmentByCourseId = async (course_id) => {
  const result = await db.Assignment.findAll({ where: { course_id } });

  if (_.isEmpty(result)) {
    return Promise.reject(Boom.notFound("Course Not Found"));
  }

  return Promise.resolve(result);
};

const createAssignment = async (assignment) => {
  const result = await db.Assignment.create(
    {
      name: assignment.name,
      instruction: assignment.instruction,
      dueDate: assignment.dueDate,
      course_id: assignment.course_id,
    },
    { returning: true }
  );

  return Promise.resolve(result.dataValues);
};

module.exports = {
  getAssignmentByCourseId,
  createAssignment,
};
