const express = require("express");
const bcrypt = require("bcryptjs");
const httpStatusCodes = require("http-status-codes").StatusCodes;
const isEmpty = require("is-empty");
const User = require("../models/user");

const router = express.Router();

/**
 * @route   POST     /user/login
 * @desc    login both type users
 * @access  PUBLIC
 */
router.post("/login", (req, res) => {
    // TODO :: perform validation
    const { email, password } = req.body;
    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "id does not exists" });
        }
        bcrypt.compare(password, user.password).then((matched) => {
            if (matched) {
                console.log("ok");
                res.json({
                    ok: true,
                    user: {
                        email,
                        isRecruiter: user.isRecruiter,
                    },
                });
            } else {
                res.status(httpStatusCodes.UNAUTHORIZED).json({
                    error: "incorrect passowrd",
                });
            }
        });
    });
});

/**
 * @route   POST     /user/register
 * @desc    register both type users
 * @access  PUBLIC
 */
router.post("/register", (req, res) => {
    // TODO :: perform validation
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "id exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isRecruiter: req.body.isRecruiter,
            });
            if (newUser.isRecruiter == "true") {
                newUser.bio = req.body.bio;
                newUser.contact = req.body.contact;
            } else {
                newUser.ed = req.body.ed;
                newUser.skills = req.body.skills;
            }

            bcrypt.hash(newUser.password, 10, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then((user) => {
                        res.json({ user });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
                    });
            });
        }
    });
});

/**
 * @route   GET     /user/profile
 * @desc    get data of current user
 * @access  RESTRICTED
 */
router.get("/profile", (req, res) => {
    // TODO :: perform validation
    const { email } = req.query;
    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "id does not exists" });
        }
        res.send(user);
    });
});

/**
 * @route   POST     /user/profile
 * @desc    update data of current user
 * @access  RESTRICTED
 */
router.post("/profile", (req, res) => {
    // TODO :: perform validation
    const email = req.body.email;
    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(httpStatusCodes.BAD_REQUEST).json({ error: "id does not exists" });
        }
        for (const key in req.body.user) {
            user[key] = req.body.user[key];
        }
        user.save()
            .then((user) => {
                res.json({ user });
            })
            .catch((err) => {
                console.log(err);
                res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).send(err);
            });
    });
});

module.exports = router;
