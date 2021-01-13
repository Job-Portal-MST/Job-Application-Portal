const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const DB_NAME = "jobsdb";
const PORT = 4000;

const logger = require("./logger");
const applicantRouter = require("./routes/applicant");
const recruiterRouter = require("./routes/recruiter");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

// adding routes
app.use("/applicant", applicantRouter);
app.use("/recruiter", recruiterRouter);

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
