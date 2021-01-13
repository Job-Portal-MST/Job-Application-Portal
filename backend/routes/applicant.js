const httpCodes = require("http-status-codes");
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
router.post("/new", (req, res) => {
  const newAppl = new applicant({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  newAppl
    .save()
    .then((data) => {
      console.log("new applicant=> " + data);
      res.send("ok");
    })
    .catch((err) => {
      console.log(err);
      res.status(httpCodes.StatusCodes.BAD_REQUEST).send(err);
    });
});

module.exports = router;
