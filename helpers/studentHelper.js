const db = require("../models");
const lecturer = require("../models/lecturer");

const getAllStudent = async () => {
  const result = await db.Student.findAll();

  return Promise.resolve(result);
};

const getStudentById = async (id) => {
  const result = await db.Student.findAll({
    where: {
      id,
    },
  });

  return Promise.resolve(result);
};

const createStudent = async (name, major) => {
  await db.Student.create({
    name: name,
    major: major,
  });
};

const updateStudent = async (id, name, major) => {
  await db.Student.update(
    { name, major },
    {
      where: {
        id,
      },
    }
  );
};

const deleteStudent = async (id) => {
  await db.Student.destroy({
    where: {
      id,
    },
  });
};

const getStudentCourse = async (id) => {
  const result = await db.Student.findByPk(id, {
    include: [
      {
        model: db.Course,
        as: "courses",
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  return Promise.resolve(result);
};

module.exports = {
  getAllStudent,
  getStudentById,
  getStudentCourse,
  createStudent,
  updateStudent,
  deleteStudent,
};
