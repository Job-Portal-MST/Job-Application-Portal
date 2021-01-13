const express = require("express");
const router = express.Router();
const httpCodes = require("http-status-codes");

const recruiter = require("../models/recruiter");

/**
 * @route GET recruiter
 * @desc return list of all recruiters
 * @access PUBLIC
 */
router.get("/", (req, res) => {
    recruiter.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.send(httpCodes.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        } else {
            res.json(data);
        }
    });
});

/**
 * @route POST recruiter
 * @desc add recruiter
 * @access PUBLIC
 */
router.post("/", (req, res) => {
    const newRec = new recruiter({
        name: req.body.name,
        email: req.body.email,
        bio: req.body.bio,
        contact: req.body.contact,
    });

    newRec
        .save()
        .then((data) => {
            console.log(data);
            res.send("ok");
        })
        .catch((error) => {
            console.log(error);
            res.status(httpCodes.StatusCodes.BAD_REQUEST).send(error);
        });
});

module.exports = router;
