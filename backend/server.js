const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const DB_NAME = "jobsdb";
const PORT = 4000;

const logger = require("./logger");
const userRouter = require("./routes/user");
const jobRouter = require("./routes/job");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

// adding routes
app.use("/user", userRouter);
app.use("/job", jobRouter);

// db connection
mongoose.connect("mongodb://127.0.0.1:27017/" + DB_NAME, {
    useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
    console.log("MongoDB database connection established successfully !");
});

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
