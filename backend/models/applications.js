const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const appnSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: "job",
    required: true,
  },
  applicant: {
    type: Schema.Types.ObjectId,
    ref: "applicant",
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  bio: {
    type: String,
    default: "",
  },
});

const application = mongoose.model("application", appnSchema);

module.exports = application;
