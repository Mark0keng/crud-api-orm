const express = require("express");
const cors = require("cors");

const app = express();
const Port = 5000;

// Import Routes
const authRoute = require("./api/auth");
const studentRoute = require("./api/student");
const courseRoute = require("./api/course");
const lecturerRoute = require("./api/lecturer");
const studentCourseRoute = require("./api/studentCourse");
const AssignmentRoute = require("./api/assignment");
const StudentAssignmentRoute = require("./api/studentAssignment");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.use("/", authRoute);
app.use("/student", studentRoute);
app.use("/course", courseRoute);
app.use("/lecturer", lecturerRoute);
app.use("/student-course", studentCourseRoute);
app.use("/assignment", AssignmentRoute);
app.use("/student-assignment", StudentAssignmentRoute);

app.listen(Port, () => {
  console.log(["Info"], `Server started on port ${Port}`);
});
