const asyncHandler = require("express-async-handler");

const requireAdmin = asyncHandler(async (req, res, next) => {
  if (req.author.role !== "ADMIN") {
    res.status(401);
    throw new Error("Not Authorized, required Admin privileges ");
  }
  next();
});

module.exports = {
  requireAdmin,
};
