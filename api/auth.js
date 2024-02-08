const Router = require("express").Router();

const Middleware = require("../middlewares/authMiddleware");
const Validation = require("../helpers/validationHelper");
const AuthHelper = require("../helpers/authHelper");
const GeneralHelper = require("../helpers/generalHelper");
const { request } = require("express");

const register = async (request, reply) => {
  try {
    Validation.registerValidation(request.body);

    const { username, name, email, password, role } = request.body;
    const response = await AuthHelper.registerUser({
      username,
      name,
      email,
      password,
      role,
    });

    return reply.send(response);
  } catch (err) {
    return reply
      .status(GeneralHelper.statusResponse(err))
      .send(GeneralHelper.errorResponse(err));
  }
};

const login = async (request, reply) => {
  try {
    Validation.loginValidation(request.body);

    const { email, password } = request.body;
    const response = await AuthHelper.login({ email, password });

    return reply.send(response);
  } catch (err) {
    return reply
      .status(GeneralHelper.statusResponse(err))
      .send(GeneralHelper.errorResponse(err));
  }
};

const getProfile = async (request, reply) => {
  try {
    const { verifiedUser } = request.user;
    const response = await AuthHelper.getProfile(verifiedUser.email);

    return reply
      .status(200)
      .json({ message: "Successfully get data", data: response });
  } catch (err) {
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const changePassword = async (request, reply) => {
  try {
    Validation.changePasswordValidation(request.body);

    const { oldPassword, newPassword } = request.body;
    const { verifiedUser } = request.user;
    const response = await AuthHelper.changePassword(
      verifiedUser.email,
      oldPassword,
      newPassword
    );

    return reply.send(response);
  } catch (err) {
    console.log(err);
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const getUrlForgotPassword = async (request, reply) => {
  try {
    Validation.urlForgotPasswordValidation(request.body);
    const response = await AuthHelper.getUrlForgotPassword(request.body.email);

    return reply.send(response);
  } catch (err) {
    console.log(err);
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const changeForgotPassword = async (request, reply) => {
  try {
    Validation.forgotPasswordValidation(request.body);

    const response = await AuthHelper.changeForgotPassword(
      request.params.token,
      request.body.newPassword
    );

    return reply.send(response);
  } catch (err) {
    console.log(err);
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

// eslint-disable-next-line arrow-body-style
const hello = async (request, reply) => {
  // SAMPLE API WITH JWT MIDDLEWARE
  return reply.send("HELLO");
};

Router.post("/register", register);
Router.post("/login", login);
Router.get("/get-profile", Middleware.validateToken, getProfile);
Router.put("/change-password", Middleware.validateToken, changePassword);
Router.post("/forgot-password", getUrlForgotPassword);
Router.put("/forgot-password/change/:token", changeForgotPassword);
Router.get("/hello", Middleware.validateToken, hello);

module.exports = Router;
