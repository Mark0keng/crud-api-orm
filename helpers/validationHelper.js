const Joi = require("joi");
const Boom = require("boom");

const studentValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    major: Joi.string().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const lecturerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const courseValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    lecturer_id: Joi.number().optional(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const studentCourseValidation = (data) => {
  const schema = Joi.object({
    student_id: Joi.number().required(),
    course_id: Joi.number().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  studentValidation,
  lecturerValidation,
  courseValidation,
  studentCourseValidation,
};
