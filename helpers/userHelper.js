const db = require("../models");

const getUserByEmail = async (email) => {
  const result = await db.User.findOne({
    where: {
      email,
    },
  });

  return result;
};

module.exports = { getUserByEmail };
