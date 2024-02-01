const Router = require("express").Router();

const GeneralHelper = require("../helpers/generalHelper");
const Validation = require("../helpers/validationHelper");
const LecturerHelper = require("../helpers/lecturerHelper");

const getAllLecturer = async (req, res) => {
  try {
    const response = await LecturerHelper.getAllLecturer();

    return res
      .status(200)
      .json({ message: "successfully get data!", data: response });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const createLecturer = async (req, res) => {
  try {
    Validation.lecturerValidation(req.body);

    await LecturerHelper.createLecturer(req.body.name);

    return res.status(200).json({ message: "Lecturer successfully created!" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const updateLecturer = async (req, res) => {
  try {
    const lecturerExist = await LecturerHelper.getLecturerById(req.params.id);
    if (lecturerExist.length === 0)
      return res.status(404).json({ message: "Lecturer not found!" });

    Validation.lecturerValidation(req.body);

    await LecturerHelper.updateLecturer(req.params.id, req.body.name);

    return res.status(200).json({ message: "Lecturer successfully updated!" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const deleteLecturer = async (req, res) => {
  try {
    const lecturerExist = await LecturerHelper.getLecturerById(req.params.id);
    if (lecturerExist.length === 0)
      return res.status(404).json({ message: "Lecturer not found!" });

    await LecturerHelper.deleteLecturer(req.params.id);

    return res.status(200).json({ message: "Lecturer successfully deleted" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const getLecturerCourse = async (req, res) => {
  try {
    const response = await LecturerHelper.getLecturerCourse(req.params.id);

    return res
      .status(200)
      .json({ message: "successfully get data!", data: response });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

Router.get("/", getAllLecturer);
Router.get("/:id/get-course", getLecturerCourse);
Router.post("/create", createLecturer);
Router.put("/update/:id", updateLecturer);
Router.delete("/delete/:id", deleteLecturer);

module.exports = Router;
