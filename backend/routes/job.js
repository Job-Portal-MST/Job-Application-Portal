const express = require("express");
const router = express.Router();
const httpCodes = require("http-status-codes");

const job = require("../models/job");

/**
 * @route GET job
 * @desc return list of all jobs or by given id
 * @access PUBLIC
 */
router.get("/", (req, res) => {
    const query = req.query.email ? { recruiterEmail: req.query.email } : {};
    job.find(query, (err, data) => {
        if (err) {
            console.log(err);
            res.send(httpCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        } else {
            res.json(data);
        }
    });
});

/**
 * @route POST /job/create
 * @desc add job
 * @access PUBLIC
 */
router.post("/create", (req, res) => {
    const newjob = new job({
        title: req.body.title,
        recruiterEmail: req.body.recruiterEmail,
        maxApplicant: req.body.maxApplicant,
        maxPositions: req.body.maxPositions,
        postingDate: req.body.postingDate,
        deadline: req.body.deadline,
        requiredSkills: req.body.requiredSkills,
        type: req.body.type,
        duration: req.body.duration,
        salary: req.body.salary,
        rating: req.body.rating,
    });

    newjob
        .save()
        .then((data) => {
            res.send("ok");
        })
        .catch((error) => {
            console.log(error);
            res.status(httpCodes.StatusCodes.BAD_REQUEST).send(error);
        });
});

module.exports = router;
