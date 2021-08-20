const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const upworkRoute = require("./routes/upworkRoutes");
const cors = require("cors");
const axios = require("axios");

const router = express.Router();

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(morgan("dev"));

app.use(bodyParser.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", upworkRoute);

module.exports = app;
