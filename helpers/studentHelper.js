const db = require("../models");

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

const getStudentByUserId = async (user_id) => {
  const result = await db.Student.findOne({
    where: {
      user_id,
    },
  });

  return Promise.resolve(result);
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
  const result = await db.Student.findOne({
    where: { user_id: id },
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
