const Router = require("express").Router();

const Middleware = require("../middlewares/authMiddleware");
const GeneralHelper = require("../helpers/generalHelper");
const Validation = require("../helpers/validationHelper");
const CourseHelper = require("../helpers/courseHelper");
const StudentHelper = require("../helpers/studentHelper");
const StudentCourseHelper = require("../helpers/studentCourseHelper");

const joinCourse = async (req, res) => {
  try {
    Validation.joinCourseValidation(req.body);

    const student = await StudentHelper.getStudentById(req.body.student_id);

    const course = await CourseHelper.getCourseByCode(req.body.code);

    await StudentCourseHelper.studentAlreadyMember(student.id, course.id);

    await StudentCourseHelper.assignStudentToCourse(student.id, course.id);

    return res
      .status(200)
      .json({ message: "Student successfully assigned to course!" });
  } catch (error) {
    console.log(error);
    return res
      .status(GeneralHelper.statusResponse(error))
      .send(GeneralHelper.errorResponse(error));
  }
};

Router.post("/join", joinCourse);

module.exports = Router;
