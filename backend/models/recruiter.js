const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const recSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: false,
  },
  contact: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
});

const recruiter = mongoose.model("recruiter", recSchema);

module.exports = recruiter;
