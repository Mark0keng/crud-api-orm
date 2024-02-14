const multer = require("multer");
const DIR = "./public";

const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

const fileFilter = (req, file, cb) => {
  if (
    // file.mimetype !== "image/jpeg" &&
    // file.mimetype !== "image/jpg" &&
    // file.mimetype !== "image/png" &&
    file.mimetype !== "application/pdf"
  ) {
    req.fileValidationError = new Error(
      "Unsupported file type! Please upload only PDF file."
    );
    return cb(null, false);
  }
  cb(null, true);
};

const uploadMedia = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 20000000 },
});

module.exports = uploadMedia;
