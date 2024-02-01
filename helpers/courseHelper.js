const db = require("../models");
const lecturer = require("../models/lecturer");

const getCourseById = async (id) => {
  const result = await db.Course.findAll({
    where: {
      id,
    },
  });

  return Promise.resolve(result);
};

const getAllCourse = async () => {
  const result = await db.Course.findAll();

  return Promise.resolve(result);
};

const createCourse = async (name, lecturer_id) => {
  await db.Course.create({
    name: name,
    lecturer_id: lecturer_id,
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
  createCourse,
  getAllCourse,
  getCourseById,
  getCourseMember,
  updateCourse,
  deleteCourse,
};
