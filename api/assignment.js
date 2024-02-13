const Router = require("express").Router();

const GeneralHelper = require("../helpers/generalHelper");
const Validation = require("../helpers/validationHelper");
const AssignmentHelper = require("../helpers/AssignmentHelper");
const {
  updateStudentAssignment,
} = require("../helpers/studentAssignmentHelper");

const getAssignmentById = async (req, res) => {
  try {
    const response = await AssignmentHelper.getAssignmentById(req.params.id);

    return res
      .status(200)
      .json({ message: "Get data successful", data: response });
  } catch (error) {
    return res
      .status(GeneralHelper.statusResponse(error))
      .send(GeneralHelper.errorResponse(error));
  }
};

const getCourseAssignment = async (req, res) => {
  try {
    const response = await AssignmentHelper.getAssignmentByCourseId(
      req.params.courseId
    );

    return res
      .status(200)
      .json({ message: "Get data successful", data: response });
  } catch (error) {
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

const updateAssignment = async (req, res) => {
  try {
    Validation.AssignmentValidation(req.body);

    await AssignmentHelper.updateAssignment(req.body, req.params.id);

    return res.status(200).json({ message: "Assignment successfully updated" });
  } catch (error) {
    return res
      .status(GeneralHelper.statusResponse(error))
      .send(GeneralHelper.errorResponse(error));
  }
};

const deleteAssignment = async (req, res) => {
  try {
    await AssignmentHelper.deleteAssignment(req.params.id);

    return res.status(200).json({ message: "Assignment successfully deleted" });
  } catch (error) {
    console.log(error);
    return res
      .status(GeneralHelper.statusResponse(error))
      .send(GeneralHelper.errorResponse(error));
  }
};

Router.get("/:id", getAssignmentById);
Router.get("/course/:courseId", getCourseAssignment);
Router.post("/create", createAssignment);
Router.put("/update/:id", updateAssignment);
Router.delete("/delete/:id", deleteAssignment);

module.exports = Router;
