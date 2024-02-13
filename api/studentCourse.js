const Router = require("express").Router();

const Boom = require("boom");
const _ = require("lodash");

const Middleware = require("../middlewares/authMiddleware");
const GeneralHelper = require("../helpers/generalHelper");
const Validation = require("../helpers/validationHelper");
const CourseHelper = require("../helpers/courseHelper");
const StudentHelper = require("../helpers/studentHelper");
const StudentCourseHelper = require("../helpers/studentCourseHelper");

const createStudentCourse = async (req, res) => {
  try {
    Validation.studentCourseValidation(req.body);

    const student = await StudentHelper.getStudentById(req.body.student_id);

    const course = await CourseHelper.getCourseById(req.body.course_id);

    const studentCourse = await StudentCourseHelper.getStudentCourse(
      student.id,
      course.id
    );
    if (!_.isEmpty(studentCourse)) {
      return Promise.reject(Boom.badRequest("Student Already Member"));
    }

    await StudentCourseHelper.createStudentCourse(student.id, course.id);

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

const removeStudentCourse = async (req, res) => {
  try {
    await StudentCourseHelper.deleteStudentCourse(
      req.params.studentId,
      req.params.courseId
    );

    return res
      .status(200)
      .json({ message: "Student successfully removed from course!" });
  } catch (error) {
    console.log(error);
    return res
      .status(GeneralHelper.statusResponse(error))
      .send(GeneralHelper.errorResponse(error));
  }
};

Router.post("/join", createStudentCourse);
Router.delete("/student/:studentId/course/:courseId", removeStudentCourse);

module.exports = Router;
