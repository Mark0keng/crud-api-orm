const Boom = require("boom");
const db = require("../models");
const _ = require("lodash");

const getAssignmentById = async (id) => {
  const result = await db.Assignment.findOne({ where: { id } });

  if (_.isEmpty(result)) {
    return Promise.reject(Boom.notFound("Course Not Found"));
  }

  return Promise.resolve(result.dataValues);
};

const getAssignmentByCourseId = async (course_id) => {
  const result = await db.Assignment.findAll({ where: { course_id } });

  if (_.isEmpty(result)) {
    return Promise.reject(Boom.notFound("Assignment Not Found"));
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

const updateAssignment = async (assignment, id) => {
  await getAssignmentById(id);

  await db.Assignment.update(
    {
      name: assignment.name,
      instruction: assignment.instruction,
      dueDate: assignment.dueDate,
      course_id: assignment.course_id,
    },
    { where: { id } }
  );

  return Promise.resolve(true);
};

const deleteAssignment = async (id) => {
  await getAssignmentById(id);

  await db.Assignment.destroy({
    where: { id },
  });

  return Promise.resolve(true);
};

module.exports = {
  getAssignmentById,
  getAssignmentByCourseId,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
