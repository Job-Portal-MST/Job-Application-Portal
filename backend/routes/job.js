const express = require("express");
const router = express.Router();
const httpCodes = require("http-status-codes");
const httpStatusCodes = require("http-status-codes").StatusCodes;

const Job = require("../models/job");

/**
 * @route GET job
 * @desc return list of all jobs or by given id
 * @access PUBLIC
 */
router.get("/", (req, res) => {
    const query = req.query.email ? { recruiterEmail: req.query.email } : {};
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
 * @route POST /job/create
 * @desc add job
 * @access PUBLIC
 */
router.post("/create", (req, res) => {
    const newjob = new Job({
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

/**
 * @route POST /job/edit
 * @desc add job
 * @access PUBLIC
 */
router.post("/edit", (req, res) => {
    const query = { _id: req.body.job._id };
    Job.findOne(query).then((job) => {
        if (!job) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "job does not exists" });
        }
        for (const key in req.body.job) {
            job[key] = req.body.job[key];
        }
        job.save()
            .then((res) => {
                res.json({ job });
            })
            .catch(res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: "error" }));
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
