const Router = require("express").Router();

const GeneralHelper = require("../helpers/generalHelper");
const Validation = require("../helpers/validationHelper");
const StudentAssignmentHelper = require("../helpers/studentAssignmentHelper");

const studentAssignmentCreate = async (req, res) => {
  try {
    Validation.StudentAssignmentValidation(req.body);

    await StudentAssignmentHelper.createStudentAssignment(re.body);

    return res
      .status(200)
      .json({ message: "successfully created!", data: response });
  } catch (error) {
    return res
      .status(GeneralHelper.statusResponse(error))
      .send(GeneralHelper.errorResponse(error));
  }
};

Router.post("/create", studentAssignmentCreate);

module.exports = Router;
