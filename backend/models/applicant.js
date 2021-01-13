const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const applicantSchema = new Schema({
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
    required: true,
  },
  ed: {
    type: Array,
    default: [],
  },
  skills: {
    type: Array,
    default: [],
  },
  applyCnt: {
    type: Number,
    default: 0,
  },
});

const applicant = mongoose.model("applicant", applicantSchema);

module.exports = applicant;
