const Router = require("express").Router();

const GeneralHelper = require("../helpers/generalHelper");
const Validation = require("../helpers/validationHelper");
const StudentAssignmentHelper = require("../helpers/studentAssignmentHelper");
const {
  uploadToCloudinary,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const uploadMedia = require("../middlewares/uploadMedia");

const getStudentAssignment = async (req, res) => {
  try {
    const response = await StudentAssignmentHelper.getStudentAssignment(
      req.params.studentId,
      req.params.assignmentId
    );

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

const studentAssignmentCreate = async (req, res) => {
  try {
    Validation.StudentAssignmentValidation(req.body);

    await StudentAssignmentHelper.createStudentAssignment(req.body);

    return res.status(200).json({ message: "successfully created!" });
  } catch (error) {
    return res
      .status(GeneralHelper.statusResponse(error))
      .send(GeneralHelper.errorResponse(error));
  }
};

const submitStudentAssignment = async (req, res) => {
  let fileResult;

  try {
    if (req?.fileValidationError)
      return res.status(400).json({ message: req.fileValidationError.message });

    if (!req?.files?.fileSubmit)
      return res.status(400).json({ message: "File is required" });

    Validation.StudentAssignmentValidation(req.body);

    fileResult = await uploadToCloudinary(req.files.fileSubmit[0], "auto");

    if (!fileResult?.url)
      return res.status(500).json({ message: fileSubmit.error });

    const data = await StudentAssignmentHelper.updateStudentAssignment({
      ...req.body,
      fileSubmit: fileResult.url,
    });

    return res.status(200).json({ message: "successfully created!", data });
  } catch (error) {
    console.log(error);
    if (fileResult?.public_id) {
      await cloudinaryDeleteImg(fileResult.public_id, "image");
    }

    return res
      .status(GeneralHelper.statusResponse(error))
      .send(GeneralHelper.errorResponse(error));
  }
};

Router.get(
  "/student/:studentId/assignment/:assignmentId",
  getStudentAssignment
);
Router.post("/create", studentAssignmentCreate);
Router.put(
  "/submit",
  uploadMedia.fields([{ name: "fileSubmit", maxCount: 1 }]),
  submitStudentAssignment
);

module.exports = Router;
