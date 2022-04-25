const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Author = require("../model/authorModel");

const protect = asyncHandler(async (req, res, next) => {
  let Token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token
      Token = req.headers.authorization.split(" ")[1];
      //verify token
      const decoded = jwt.verify(Token, process.env.Secret_Key);
      // extract author from token
      req.author = await Author.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!Token) {
    res.status(401);
    throw new Error("Not Valid Token");
  }
});

module.exports = {
  protect,
};
