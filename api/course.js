const Router = require("express").Router();

const GeneralHelper = require("../helpers/generalHelper");
const Validation = require("../helpers/validationHelper");
const CourseHelper = require("../helpers/courseHelper");
const LecturerHelper = require("../helpers/lecturerHelper");

const getAllCourse = async (req, res) => {
  try {
    const response = await CourseHelper.getAllCourse();

    return res
      .status(200)
      .json({ message: "successfully get data!", data: response });
  } catch (error) {
    console.log(error);
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const createCourse = async (req, res) => {
  try {
    Validation.courseValidation(req.body);

    await CourseHelper.createCourse(req.body.name, req.body.lecturer_id);

    return res.status(200).json({ message: "Course successfully created!" });
  } catch (error) {
    console.log(error);
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseExist = await CourseHelper.getCourseById(req.params.id);
    if (courseExist.length === 0)
      return res.status(404).json({ message: "Course not found!" });

    Validation.courseValidation(req.body);

    if (req.body.lecturer_id) {
      const lecturerExist = await LecturerHelper.getLecturerById(
        req.body.lecturer_id
      );
      if (lecturerExist.length === 0)
        return res.status(404).json({ message: "Lecturer not found!" });
    }

    await CourseHelper.updateCourse(
      req.params.id,
      req.body.name,
      req.body.lecturer_id
    );

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

Router.get("/", getAllCourse);
Router.get("/:id/get-member", getCourseMember);
Router.post("/create", createCourse);
Router.put("/update/:id", updateCourse);
Router.delete("/delete/:id", deleteCourse);

module.exports = Router;
