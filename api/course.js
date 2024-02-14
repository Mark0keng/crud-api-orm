const Router = require("express").Router();

const GeneralHelper = require("../helpers/generalHelper");
const Validation = require("../helpers/validationHelper");
const CourseHelper = require("../helpers/courseHelper");
const LecturerHelper = require("../helpers/lecturerHelper");
const Middleware = require("../middlewares/authMiddleware");

const getCourseByCode = async (req, res) => {
  try {
    const response = await CourseHelper.getCourseByCode(req.params.code);

    return res
      .status(200)
      .json({ message: "successfully get data!", data: response });
  } catch (error) {
    return res
      .status(GeneralHelper.statusResponse(error))
      .send(GeneralHelper.errorResponse(error));
  }
};

const getAllCourse = async (req, res) => {
  try {
    const response = await CourseHelper.getAllCourse();

    return res
      .status(200)
      .json({ message: "successfully get data!", data: response });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const createCourse = async (req, res) => {
  try {
    req.body.code = await CourseHelper.generateCourseCode(7);

    Validation.courseValidation(req.body);

    await CourseHelper.createCourse(req.body);

    return res.status(200).json({ message: "Course successfully created!" });
  } catch (error) {
    return res
      .status(GeneralHelper.statusResponse(error))
      .send(GeneralHelper.errorResponse(error));
  }
};

const updateCourse = async (req, res) => {
  try {
    await CourseHelper.getCourseById(req.params.id);

    Validation.courseValidation(req.body);

    if (req.body.lecturer_id) {
      const lecturerExist = await LecturerHelper.getLecturerById(
        req.body.lecturer_id
      );
      if (lecturerExist.length === 0)
        return res.status(404).json({ message: "Lecturer not found!" });
    }

    await CourseHelper.updateCourse(req.params.id, req.body);

    return res.status(200).json({ message: "Course successfully updated!" });
  } catch (error) {
    console.log(error);
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseExist = await CourseHelper.getCourseById(req.params.id);
    if (courseExist.length === 0)
      return res.status(404).json({ message: "Course not found!" });

    await CourseHelper.deleteCourse(req.params.id);

    return res.status(200).json({ message: "Course successfully deleted" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

// Many-to-many case
const getCourseMember = async (req, res) => {
  try {
    const courseExist = await CourseHelper.getCourseById(req.params.id);
    if (courseExist.length === 0)
      return res.status(404).json({ message: "Course not found!" });

    const response = await CourseHelper.getCourseMember(req.params.id);

    return res
      .status(200)
      .json({ message: "successfully get data!", data: response });
  } catch (error) {
    console.log(error);
    return res.send(GeneralHelper.errorResponse(error));
  }
};

Router.get("/:code", getCourseByCode);
Router.get("/", getAllCourse);
Router.get("/:id/get-member", getCourseMember);
Router.post("/create", createCourse);
Router.put("/update/:id", updateCourse);
Router.delete("/delete/:id", deleteCourse);

module.exports = Router;
