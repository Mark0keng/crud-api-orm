const Boom = require("boom");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const db = require("../models");
const GeneralHelper = require("./generalHelper");
const StudentHelper = require("./studentHelper");
const LecturerHelper = require("./lecturerHelper");
const UserHelper = require("./userHelper");

const jwtSecretToken = "super_strong_key";
const jwtExpiresIn = "24h";
const salt = bcrypt.genSaltSync(10);

const __hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const __comparePassword = (payloadPass, dbPass) => {
  return bcrypt.compareSync(payloadPass, dbPass);
};

const __generateToken = (data) => {
  return jwt.sign(data, jwtSecretToken, { expiresIn: jwtExpiresIn });
};

const registerUser = async (dataObject) => {
  const { username, name, email, password, role } = dataObject;

  try {
    const user = await db.User.findOne({
      where: { email },
    });
    if (!_.isEmpty(user)) {
      return Promise.reject(Boom.badRequest("EMAIL_HAS_BEEN_USED"));
    }

    const hashedPass = __hashPassword(password);
    await db.User.create({ username, email, password: hashedPass, role });

    const latestUser = await db.User.findOne({
      order: [["createdAt", "DESC"]],
    });

    if (Number(role) === 1) {
      await StudentHelper.createStudent(
        name,
        "no-major-assigned",
        latestUser.dataValues.id
      );
    } else {
      await LecturerHelper.createLecturer(name, latestUser.dataValues.id);
    }

    return Promise.resolve(true);
  } catch (err) {
    console.log(err);
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const login = async (dataObject) => {
  const { email, password } = dataObject;

  try {
    const user = await db.User.findOne({
      where: { email },
    });

    if (_.isEmpty(user)) {
      return Promise.reject(Boom.notFound("USER_NOT_FOUND"));
    }

    const isPassMatched = __comparePassword(password, user.password);
    if (!isPassMatched) {
      return Promise.reject(Boom.badRequest("WRONG_CREDENTIALS"));
    }

    let userInfo = null;

    if (user.role === 1) {
      userInfo = await StudentHelper.getStudentByUserId(user.id);
    }

    if (user.role === 2) {
      userInfo = await LecturerHelper.getLecturerByUserId(user.id);
    }

    const token = __generateToken({
      id: user.id,
      username: user.username,
      name: userInfo.name,
      email: user.email,
      role: user.role,
      ...(user.role === 1 && { student_id: userInfo.id }),
      ...(user.role === 2 && { lecturer_id: userInfo.id }),
    });

    return Promise.resolve({ token });
  } catch (err) {
    console.log(err);
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const changePassword = async (email, oldPassword, newPassword) => {
  try {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });

    const isPassMatched = __comparePassword(oldPassword, user.password);
    if (!isPassMatched) {
      return Promise.reject(Boom.badRequest("WRONG_CREDENTIALS"));
    }

    await db.User.update(
      { password: __hashPassword(newPassword) },
      {
        where: {
          email,
        },
      }
    );

    return Promise.resolve({ message: "Successfully change password" });
  } catch (err) {
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const getUrlForgotPassword = async (email) => {
  const user = await UserHelper.getUserByEmail(email);
  if (_.isEmpty(user)) {
    return Promise.reject(Boom.notFound("ACCOUNT_NOT_FOUND"));
  }

  const currentTime = new Date();
  const expiresIn = currentTime.setMinutes(currentTime.getMinutes() + 3);

  const tokenExist = await db.ForgotPassword.findOne({
    where: {
      user_id: user.id,
    },
  });

  const token = uuidv4();

  if (_.isEmpty(tokenExist)) {
    await db.ForgotPassword.create({
      token,
      expiresIn,
      user_id: user.id,
    });
  } else {
    await db.ForgotPassword.update(
      { token, expiresIn },
      {
        where: {
          user_id: user.id,
        },
      }
    );
  }

  return Promise.resolve({
    message: "resetUrl is privacy, don't share this information",
    resetUrl: `http://localhost:5000/forgot-password/change/${token}`,
    token,
  });
};

const changeForgotPassword = async (token, newPassword) => {
  const forgotPassword = await db.ForgotPassword.findOne({
    where: {
      token,
    },
  });
  if (_.isEmpty(forgotPassword)) {
    return Promise.reject(Boom.notFound("TOKEN_NOT_VALID"));
  }

  const currentTime = new Date();
  const expireTime = new Date(forgotPassword.expiresIn);
  console.log(currentTime, expireTime);
  if (currentTime > expireTime) {
    return Promise.reject(Boom.badRequest("TOKEN_EXPIRED"));
  }

  await db.User.update(
    { password: __hashPassword(newPassword) },
    {
      where: {
        id: forgotPassword.user_id,
      },
    }
  );

  await db.ForgotPassword.destroy({
    where: {
      id: forgotPassword.id,
    },
  });

  return Promise.resolve({
    message: "Change password successful",
  });
};

const getProfile = async (email) => {
  const result = await db.User.findOne({
    where: {
      email,
    },
  });

  return Promise.resolve(result);
};

module.exports = {
  registerUser,
  login,
  getProfile,
  changePassword,
  getUrlForgotPassword,
  changeForgotPassword,
};
