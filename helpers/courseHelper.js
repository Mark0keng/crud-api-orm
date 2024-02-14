const Boom = require("boom");
const db = require("../models");
const _ = require("lodash");

const generateCourseCode = async (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

const getCourseById = async (id) => {
  const result = await db.Course.findOne({
    where: {
      id,
    },
  });

  if (_.isEmpty(result)) {
    return Promise.reject(Boom.notFound("Course Not Found"));
  }

  return Promise.resolve(result.dataValues);
};

const getCourseByCode = async (code) => {
  const result = await db.Course.findOne({
    where: {
      code,
    },
  });

  if (_.isEmpty(result)) {
    return Promise.reject(Boom.notFound("Course Not Found"));
  }

  return Promise.resolve(result.dataValues);
};

const getAllCourse = async () => {
  const result = await db.Course.findAll();

  return Promise.resolve(result);
};

const createCourse = async (course) => {
  await db.Course.create({
    name: course.name,
    subject: course.subject,
    room: course.room,
    description: course.description,
    code: course.code,
    lecturer_id: course.lecturer_id,
  });
};

const updateCourse = async (id, course) => {
  await db.Course.update(
    {
      name: course.name,
      subject: course.subject,
      room: course.room,
      description: course.description,
      lecturer_id: course.lecturer_id,
    },
    {
      where: {
        id,
      },
    }
  );
};

const deleteCourse = async (id) => {
  await db.Course.destroy({
    where: {
      id,
    },
  });
};

const getCourseMember = async (id) => {
  const result = await db.Course.findByPk(id, {
    include: [
      {
        model: db.Lecturer,
        as: "lecturer",
        attributes: ["name"],
      },
      {
        model: db.Student,
        as: "students",
        attributes: ["id", "name", "major"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  if (_.isEmpty(result)) {
    return Promise.reject(Boom.notFound("Course Not Found"));
  }

  return Promise.resolve(result);
};

module.exports = {
  generateCourseCode,
  createCourse,
  getAllCourse,
  getCourseById,
  getCourseByCode,
  getCourseMember,
  updateCourse,
  deleteCourse,
};
