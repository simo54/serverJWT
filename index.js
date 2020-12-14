require("./dbConfig");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

// Routes
const authRoute = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// To send body requests
app.use(express.json());

// Middleware Routes
app.use("/user", authRoute);

app.listen(5000, console.log("Server running on port 5000"));
