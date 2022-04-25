// should contain each resource in project
const express = require("express");

const router = express.Router();
const {
  getAuthors,
  getProjects,
  setAdmin,
} = require("../controller/adminController");

// to protect Info Page of author
const { protect } = require("../middleware/auth");

// to make sure that only the Admin can get results
const { requireAdmin } = require("../middleware/authorization");
router
  .get("/projects", protect, requireAdmin, getProjects)
  .get("/authors", protect, requireAdmin, getAuthors)
  .put("/authors/:id", protect, requireAdmin, setAdmin);

// Gate for use any function here
module.exports = router;
