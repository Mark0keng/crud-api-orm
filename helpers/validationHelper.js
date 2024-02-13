const Joi = require("joi");
const Boom = require("boom");

const studentValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    major: Joi.string().required(),
    user_id: Joi.number().optional(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const lecturerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    user_id: Joi.number().optional(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const courseValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    subject: Joi.string().optional(),
    room: Joi.string().optional(),
    description: Joi.string().optional(),
    code: Joi.string().required(),
    lecturer_id: Joi.number().required(),
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

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.number().integer().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const changePasswordValidation = (data) => {
  const schema = Joi.object({
    verifiedUser: Joi.required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const urlForgotPasswordValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const forgotPasswordValidation = (data) => {
  const schema = Joi.object({
    newPassword: Joi.string().min(6).required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const AssignmentValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    instruction: Joi.string().allow(""),
    dueDate: Joi.date().required(),
    course_id: Joi.number().required(),
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const StudentAssignmentValidation = (data) => {
  const schema = Joi.object({
    student_id: Joi.number().required(),
    assignment_id: Joi.number().required(),
    fileSubmit: Joi.string().optional(),
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
  registerValidation,
  loginValidation,
  changePasswordValidation,
  urlForgotPasswordValidation,
  forgotPasswordValidation,
  AssignmentValidation,
  StudentAssignmentValidation,
};
