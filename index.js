// Importing DB config
require("./dbConfig");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;
// Routes
const dataRoute = require("./routes/dataTestAccess");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login&auth");

// BodyParsers Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware Routes
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/private", dataRoute);

app.listen(port, console.log("Server running on port 5000"));
