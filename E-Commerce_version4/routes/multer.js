const express = require("express");
const router = express.Router();
const multer = require("multer");

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate unique filename for uploaded file
  },
});
const upload = multer({ storage: storage });

// Route to add a new product
router.post("/", upload.single("image"), (req, res) => {
  try {
    const imagePath = req.file.path;
    res.status(200).json({ imagePath });
  } catch (error) {
    res.status(400).json({ message: "Error uploading image", error });
  }
});
module.exports = router;
