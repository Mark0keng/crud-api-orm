const db = require("../models");

const getLecturerById = async (id) => {
  const result = await db.Lecturer.findAll({
    where: {
      id,
    },
  });

  return Promise.resolve(result);
};

const getAllLecturer = async () => {
  const result = await db.Lecturer.findAll();

  return Promise.resolve(result);
};

const createLecturer = async (name, user_id) => {
  await db.Lecturer.create({
    name: name,
    user_id: user_id,
  });
};

const updateLecturer = async (id, name) => {
  await db.Lecturer.update(
    { name },
    {
      where: {
        id,
      },
    }
  );
};

const deleteLecturer = async (id) => {
  await db.Lecturer.destroy({
    where: {
      id,
    },
  });
};

// One-to-many case
const getLecturerCourse = async (id) => {
  const result = await db.Lecturer.findAll({
    where: {
      id,
    },
    include: "course",
  });

  return Promise.resolve(result);
};

module.exports = {
  getLecturerById,
  getAllLecturer,
  getLecturerCourse,
  createLecturer,
  updateLecturer,
  deleteLecturer,
};
