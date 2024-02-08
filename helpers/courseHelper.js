const db = require("../models");
const lecturer = require("../models/lecturer");

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
  const result = await db.Course.findAll({
    where: {
      id,
    },
  });

  return Promise.resolve(result);
};

const getCourseByCode = async (code) => {
  const result = await db.Course.findAll({
    where: {
      code,
    },
  });

  return Promise.resolve(result);
};

const getAllCourse = async () => {
  const result = await db.Course.findAll();

  return Promise.resolve(result);
};

const createCourse = async (course) => {
  console.log(course);
  await db.Course.create({
    name: course.name,
    subject: course.subject,
    room: course.room,
    description: course.description,
    code: course.code,
    lecturer_id: course.lecturer_id,
  });
};

const updateCourse = async (id, name, lecturer_id) => {
  await db.Course.update(
    { name, lecturer_id },
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
        model: db.Student,
        as: "students",
        attributes: ["name", "major"],
        through: {
          attributes: [],
        },
      },
    ],
  });

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
