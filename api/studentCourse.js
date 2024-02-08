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
    if (student.length === 0)
      return res.status(404).json({ message: "Student not found!" });

    const course = await CourseHelper.getCourseByCode(req.body.code);
    if (course.length === 0)
      return res.status(404).json({ message: "Course not found!" });

    const studentAlreadyMember = await StudentCourseHelper.studentAlreadyMember(
      student.id,
      course.id
    );
    if (studentAlreadyMember.length > 0)
      return res.status(400).json({ message: "Already member in this course" });

    await StudentCourseHelper.assignStudentToCourse(
      req.body.student_id,
      req.body.code
    );

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

Router.post("/join", Middleware.validateToken, joinCourse);

module.exports = Router;
