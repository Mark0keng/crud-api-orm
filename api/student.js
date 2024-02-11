const Router = require("express").Router();

const GeneralHelper = require("../helpers/generalHelper");
const Validation = require("../helpers/validationHelper");
const StudentHelper = require("../helpers/studentHelper");
const CourseHelper = require("../helpers/courseHelper");
const StudentCourseHelper = require("../helpers/studentCourseHelper");

const getAllCourse = async (req, res) => {
  try {
    const response = await StudentHelper.getAllStudent();

    return res
      .status(200)
      .json({ message: "successfully get data!", data: response });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const createStudent = async (req, res) => {
  try {
    Validation.studentValidation(req.body);

    await StudentHelper.createStudent(req.body.name, req.body.major);

    return res.status(200).json({ message: "Student successfully created!" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const updateStudent = async (req, res) => {
  try {
    const studentExist = await StudentHelper.getStudentById(req.params.id);
    if (studentExist.length === 0)
      return res.status(404).json({ message: "Student not found!" });

    Validation.studentValidation(req.body);

    await StudentHelper.updateStudent(
      req.params.id,
      req.body.name,
      req.body.major
    );

    return res.status(200).json({ message: "Student successfully updated!" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const deleteStudent = async (req, res) => {
  try {
    const studentExist = await StudentHelper.getStudentById(req.params.id);
    if (studentExist.length === 0)
      return res.status(404).json({ message: "Student not found!" });

    await StudentHelper.deleteStudent(req.params.id);

    return res.status(200).json({ message: "Student successfully deleted" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

const assignStudentToCourse = async (req, res) => {
  try {
    Validation.studentCourseValidation(req.body);

    const studentExist = await StudentHelper.getStudentById(
      req.body.student_id
    );
    if (studentExist.length === 0)
      return res.status(404).json({ message: "Student not found!" });

    const courseExist = await CourseHelper.getCourseById(req.body.course_id);
    if (courseExist.length === 0)
      return res.status(404).json({ message: "Course not found!" });

    const studentAlreadyMember = await StudentCourseHelper.studentAlreadyMember(
      req.body.student_id,
      req.body.course_id
    );
    if (studentAlreadyMember.length > 0)
      return res
        .status(400)
        .json({ message: "Student already member in this course" });

    await StudentCourseHelper.assignStudentToCourse(
      req.body.student_id,
      req.body.course_id
    );

    return res
      .status(200)
      .json({ message: "Student successfully assigned to course!" });
  } catch (error) {
    return res.send(GeneralHelper.errorResponse(error));
  }
};

// Many-to-many case
const getStudentCourse = async (req, res) => {
  try {
    const student = await StudentHelper.getStudentById(req.params.id);

    const response = await StudentHelper.getStudentCourse(req.params.id);

    return res
      .status(200)
      .json({ message: "successfully get data!", data: response });
  } catch (error) {
    console.log(error);
    return res
      .status(GeneralHelper.statusResponse(error))
      .send(GeneralHelper.errorResponse(error));
  }
};

Router.get("/", getAllCourse);
Router.get("/:id/get-course", getStudentCourse);
Router.post("/create", createStudent);
Router.post("/assign-to-course", assignStudentToCourse);
Router.put("/update/:id", updateStudent);
Router.delete("/delete/:id", deleteStudent);

module.exports = Router;
