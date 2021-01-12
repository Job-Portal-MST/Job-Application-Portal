var express = require("express");
var router = express.Router();

const applicant = require("../models/applicant");

/**
 * @route  GET user
 * @desc get list of all application objects
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
 * @route  POST user
 * @desc add a new user
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
