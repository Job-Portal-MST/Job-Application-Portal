const express = require("express");
const router = express.Router();
const httpCodes = require("http-status-codes");
const httpStatusCodes = require("http-status-codes").StatusCodes;

const Job = require("../models/job");
const User = require("../models/user");

/**
 * @route GET /job
 * @desc return list of all jobs or by given email or by id
 * @access PUBLIC
 */
router.get("/", (req, res) => {
    let query = req.query.email ? { recruiterEmail: req.query.email } : {};
    query = req.query.jobid ? { _id: req.query.jobid } : {};
    Job.find(query, (err, data) => {
        if (err) {
            console.log(err);
            res.send(httpCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        } else {
            data = data.filter((item) => item.removed !== "yes");
            res.json(data);
        }
    });
});

/**
 * @route GET /job/search
 * @desc return list of all jobs by title
 * @access PUBLIC
 */
router.get("/search", (req, res) => {
    const query = req.query.key ? req.query.key : "";
    Job.fuzzySearch(query)
        .then((data) => {
            data = data.filter((item) => item.removed !== "yes");
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(httpStatusCodes.BAD_REQUEST).json({ error: "error" });
        });
});

/**
 * @route POST /job/create
 * @desc add job
 * @access PUBLIC
 */
router.post("/create", (req, res) => {
    let recName = "";
    User.findOne({ email: req.body.recruiterEmail })
        .then((data) => (recName = data))
        .catch((error) => {
            console.log(error);
            res.status(httpCodes.StatusCodes.BAD_REQUEST).send(error);
        });
    const newjob = new Job({
        title: req.body.title,
        recruiterEmail: req.body.recruiterEmail,
        recruiterName: recName,
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

/**
 * @route POST /job/edit
 * @desc add job
 * @access PUBLIC
 */
router.post("/edit", (req, res) => {
    console.log(req.body);
    const query = { _id: req.body.job._id };
    Job.findOne(query)
        .then((job) => {
            if (!job) {
                return res
                    .status(httpStatusCodes.BAD_REQUEST)
                    .json({ error: "job does not exists" });
            }
            for (const key in req.body.job) {
                job[key] = req.body.job[key];
            }
            job.save()
                .then((data) => {
                    res.send("ok");
                })
                .catch((err) => {
                    console.log(err);
                    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "error" });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "error" });
        });
});

/**
 * @route POST /job/remove
 * @desc add job
 * @access PUBLIC
 */
router.post("/remove", (req, res) => {
    const query = { _id: req.body.jobid };
    Job.findOne(query).then((job) => {
        if (!job) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "job does not exists" });
        }
        job.removed = "yes";
        job.save()
            .then((job) => {
                res.json({ job });
            })
            .catch((err) => {
                console.log(err);
                res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "error" });
            });
    });
});

module.exports = router;
