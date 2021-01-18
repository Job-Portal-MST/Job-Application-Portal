const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    recruiterEmail: {
        type: String,
        required: true,
    },
    appliedCnt: {
        type: Number,
        required: true,
        default: 0,
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
        type: Number,
        required: false,
    },
    rating: {
        type: Number,
        default: 0,
    },
    ratingCnt: {
        type: Number,
        default: 0,
    },
    removed: {
        type: String,
        default: "no",
    },
});

const Job = mongoose.model("job", jobSchema);

module.exports = Job;
