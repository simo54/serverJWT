require("./dbConfig");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

// Routes
const authRoute = require("./routes/auth");
const dataRoute = require("./routes/dataTestAccess");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware Routes
app.use("/user", authRoute);
app.use("/private", dataRoute);

app.listen(5000, console.log("Server running on port 5000"));
