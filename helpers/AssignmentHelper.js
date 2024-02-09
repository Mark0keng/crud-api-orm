const db = require("../models");

const createAssignment = async (assignment) => {
  await db.Assignment.create({
    name: assignment.name,
    instruction: assignment.instruction,
    dueDate: assignment.dueDate,
    course_id: assignment.course_id,
  });
};

module.exports = {
  createAssignment,
};
