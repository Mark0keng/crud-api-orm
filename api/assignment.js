const Router = require("express").Router();

const GeneralHelper = require("../helpers/generalHelper");
const Validation = require("../helpers/validationHelper");
const CourseHelper = require("../helpers/courseHelper");
const AssignmentHelper = require("../helpers/AssignmentHelper");

const getCourseAssignment = async (req, res) => {
  try {
    const response = await AssignmentHelper.getAssignmentByCourseId(
      req.params.courseId
    );

    return res
      .status(200)
      .json({ message: "Get data successful", data: response });
  } catch (error) {
    console.log(error);
    return res
      .status(GeneralHelper.statusResponse(error))
      .send(GeneralHelper.errorResponse(error));
  }
};

const createAssignment = async (req, res) => {
  try {
    Validation.AssignmentValidation(req.body);

    const assignment = await AssignmentHelper.createAssignment(req.body);

    return res
      .status(200)
      .json({ message: "Assignment successfully created", data: assignment });
  } catch (error) {
    return res
      .status(GeneralHelper.statusResponse(error))
      .send(GeneralHelper.errorResponse(error));
  }
};

Router.get("/course/:courseId", getCourseAssignment);
Router.post("/create", createAssignment);

module.exports = Router;
