const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  recuiter: {
    type: Schema.Types.ObjectId,
    ref: "recruiter",
    required: true,
  },
  maxApplicant: {
    type: Number,
    required: true,
  },
  maxPositions: {
    type: Number,
    required: true,
  },
  postingDate: {
    type: Date,
    // required: true,
  },
  deadline: {
    type: Date,
    // required: true,
  },
  requiredSkills: {
    type: [String],
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  duration: {
    //Integer indica ng number of months. (0 (indefinite) - 6 months)
    type: Number,
    required: false,
  },
  salary: {
    //Integer indica ng number of months. (0 (indefinite) - 6 months)
    type: Number,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
});

const job = mongoose.model("job", jobSchema);

module.exports = job;
