// should contain each resource in project
const express = require("express");

const router = express.Router();
const {
  registerAuthor,
  loginAuthor,
  getAuthor,
} = require("../controller/authorController");

// to protect Info Page of author
const { protect } = require("../middleware/auth");

router
  .post("/", registerAuthor)
  .post("/login", loginAuthor)
  .get("/info", protect, getAuthor);

// Gate for use any function here
module.exports = router;
