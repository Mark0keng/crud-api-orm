const Router = require("express").Router();

const GeneralHelper = require("../helpers/generalHelper");
const Validation = require("../helpers/validationHelper");
const StudentAssignmentHelper = require("../helpers/studentAssignmentHelper");
const {
  uploadToCloudinary,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const uploadMedia = require("../middlewares/uploadMedia");

const studentAssignmentCreate = async (req, res) => {
  try {
    Validation.StudentAssignmentValidation(req.body);

    await StudentAssignmentHelper.createStudentAssignment(req.body);

    return res.status(200).json({ message: "successfully created!" });
  } catch (error) {
    console.log(error);
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

    if (!req?.files?.imageUrl)
      return res.status(400).json({ message: "File is required" });

    Validation.StudentAssignmentValidation(req.body);

    fileResult = await uploadToCloudinary(req.files.imageUrl[0], "image");

    if (!imageResult?.url)
      return res.status(500).json({ message: imageResult.error });

    await StudentAssignmentHelper.updateStudentAssignment({
      ...req.body,
      fileSubmit: fileResult,
    });

    return res.status(200).json({ message: "successfully created!" });
  } catch (error) {
    console.log(error);
    if (imageResult?.public_id) {
      await cloudinaryDeleteImg(imageResult.public_id, "image");
    }

    return res
      .status(GeneralHelper.statusResponse(error))
      .send(GeneralHelper.errorResponse(error));
  }
};

Router.post("/create", studentAssignmentCreate);
Router.post(
  "/submit",
  uploadMedia.fields([{ name: "imageUrl", maxCount: 1 }]),
  submitStudentAssignment
);

module.exports = Router;
