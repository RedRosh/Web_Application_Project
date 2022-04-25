const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author",
  },

  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Projects", projectSchema);
