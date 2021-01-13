const express = require("express");
const router = express.Router();

const applicant = require("../models/applicant");

/**
 * @route GET applicant
 * @desc get list of all applicants
 * @access public
 */
router.get("/", (req, res) => {
  applicant.find((err, data) => {
    if (err) {
      console.log(err);
    } else res.json(data);
  });
});

/**
 * @route POST applicant
 * @desc add a new applicant
 * @access public
 */
router.post("/", (req, res) => {
  console.log(req.body);
  applicant
    .create({
      name: req.body.name,
      email: req.body.email,
    })
    .then(() => console.log("done"))
    .catch((err) => console.log(err));
  res.send("done");
});

module.exports = router;
