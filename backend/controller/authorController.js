// to get token JWT
const jwt = require("jsonwebtoken");
// to hash password
const bcrypt = require("bcryptjs");
// async handler
const asyncHandler = require("express-async-handler");
// to use author model
const Author = require("../model/authorModel");
const { json } = require("express/lib/response");

//------------------register---------------------------//

// to register author or user >> /api/authors >> post method
const registerAuthor = asyncHandler(async (req, res) => {
  const { name, project_title, email, password } = req.body;
  if (!name || !project_title || !email || !password) {
    res.status(400);
    throw new Error("please add all info");
  }
  // check if author exists
  const authorExists = await Author.findOne({ email });
  if (authorExists) {
    res.status(400);
    throw new Error("Author already exists");
  }

  // hash password >> need to add salt value
  const salt = await bcrypt.genSalt(10); //generate salt
  const hashPassword = await bcrypt.hash(password, salt); // password from body with generation salt

  // create Author
  const author = await Author.create({
    name,
    project_title,
    email,
    password: hashPassword,
  });
  if (author) {
    res.status(201).json({
      _id: author.id,
      name: author.email,
      project_title: author.project_title,
      email: author.email,
      token: genToken(author._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Author Info");
  }
});

//------------------login---------------------------//

// to login author or user >> /api/authors/login >> post method
const loginAuthor = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check user email
  const author = await Author.findOne({ email });
  // compare the password with password in DB
  if (author && (await bcrypt.compare(password, author.password))) {
    res.json({
      _id: author.id,
      name: author.email,
      project_title: author.project_title,
      email: author.email,
      token: genToken(author._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }

  res.json({ message: "Login Author" });
});

//------------------Get Info >> Private---------------------------//

// to Get author or user Data >> /api/authors/info >> GET method
const getAuthor = asyncHandler(async (req, res) => {
  const { _id, name, project_title, email } = await Author.findById(
    req.author.id
  );
  res.status(200).json({
    id: _id,
    name,
    project_title,
    email,
  });
});

//--------------------Generate Token-------------------------//
const genToken = (id) => {
  return jwt.sign({ id }, process.env.Secret_Key, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerAuthor,
  loginAuthor,
  getAuthor,
};

// protect all project
