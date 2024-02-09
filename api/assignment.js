const Router = require("express").Router();

const GeneralHelper = require("../helpers/generalHelper");
const Validation = require("../helpers/validationHelper");
const CourseHelper = require("../helpers/courseHelper");
const LecturerHelper = require("../helpers/lecturerHelper");
const AssignmentHelper = require("../helpers/AssignmentHelper");

const createAssignment = async (req, res) => {
  try {
    Validation.AssignmentValidation(req.body);

    await AssignmentHelper.createAssignment(req.body);

    return res.status(200).json({ message: "Assignment succefully created" });
  } catch (error) {
    return res
      .status(GeneralHelper.statusResponse(error))
      .send(GeneralHelper.errorResponse(error));
  }
};

Router.post("/create", createAssignment);

module.exports = Router;
