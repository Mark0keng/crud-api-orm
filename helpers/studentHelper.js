const Boom = require("boom");
const _ = require("lodash");
const db = require("../models");

const getAllStudent = async () => {
  const result = await db.Student.findAll();

  return Promise.resolve(result);
};

const getStudentById = async (id) => {
  const result = await db.Student.findOne({
    where: {
      id,
    },
  });

  if (_.isEmpty(result)) {
    return Promise.reject(Boom.notFound("Student Not Found"));
  }

  return Promise.resolve(result.dataValues);
};

const getStudentByUserId = async (user_id) => {
  const result = await db.Student.findOne({
    where: {
      user_id,
    },
  });

  return Promise.resolve(result.dataValues);
};

const createStudent = async (name, major, user_id) => {
  await db.Student.create({
    name: name,
    major: major,
    user_id: user_id,
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
  // console.log(id, "<<<hello");
  const result = await db.Course.findAll({
    include: [
      {
        model: db.Student,
        as: "students",
        where: { id },
        attributes: ["name", "major"],
        through: {
          attributes: [],
        },
      },
      {
        model: db.Lecturer,
        as: "lecturer",
        attributes: ["name"],
      },
    ],
  });

  console.log(result);

  return Promise.resolve(result);
};

module.exports = {
  getAllStudent,
  getStudentById,
  getStudentByUserId,
  getStudentCourse,
  createStudent,
  updateStudent,
  deleteStudent,
};
