// async handler
const asyncHandler = require("express-async-handler");
// to use author model
const Author = require("../model/authorModel");
// to use Project model
const Projects = require("../model/projectModel");

// control the GET method - routes - access privately - only Admin  >> GET /api/admin/authors
const getAuthors = asyncHandler(async (req, res) => {
  const authors = await Author.find({});
  if (!authors) {
    return res.status(404).send("No Authors Found");
  }
  res.status(200).json({ authors });
});

// control the GET method - routes - access privately - only Admin  >> GET /api/admin/Projects
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Projects.find({});
  if (!projects) {
    return res.status(404).send("No projects Found");
  }
  res.status(200).json({ projects });
});

// control the PUT method - routes - access privately - only Admin  >> GET /api/admin/authors/:id
const setAdmin = asyncHandler(async (req, res) => {
  const author = await Author.findByIdAndUpdate(
    { _id: req.params.id },
    { role: "ADMIN" },
    { new: true }
  );
  if (!author) {
    return res.status(404).send("No Author Found");
  }
  res.status(200).json({ author });
});

module.exports = {
  getAuthors,
  getProjects,
  setAdmin,
};
