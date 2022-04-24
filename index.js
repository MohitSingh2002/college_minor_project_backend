const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

// Model
require("./models/Task");

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(express.json());

mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (req, res) => {
    console.log("MongoDB Connected");
  }
);

// Route
app.use("/task", require("./routes/taskRoute"));

app.route("/").get((req,res) => {
  res.json("First REST API");
});

const port = process.env.PORT || 8080

app.listen(Port, (req,res) => {
  console.log(`Listening on ${port}`);
});
