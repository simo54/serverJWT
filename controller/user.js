const User = require("../model/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const controller = {
  signup: async (req, res) => {
    // Checking if there is any error on the input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Getting the name, email ans psw from input
    const { name, email, password } = req.body;

    // Checking if user already exist
    const isEmailExist = await User.findOne({ email: req.body.email });

    // If email exist, send back message
    if (isEmailExist) {
      res.status(400).send("Email used");
      return;
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);
    console.log(hashedPwd);

    // Creating new user
    const user = new User({
      name,
      email,
      password: hashedPwd,
    });
    try {
      const newUser = await user.save();
      res.send("User Registered");
    } catch (e) {
      console.log(e);
      res.sendStatus(400).send("Something went wrong");
      return;
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    // Checking if user already exist
    const user = await User.findOne({ email: email });

    // If user does not exist, send vague message
    if (!user) {
      res.status(400).send("Email or password wrong");
      return;
    }

    // Checking is password is correct
    const isPwsValid = await bcrypt.compare(password, user.password);

    // If psw is invalid
    if (!isPwsValid) {
      res.status(401).send("Invalid password");
    }

    // Jwt token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_AUTH, {
      expiresIn: 60, //setting expiration in 30 seconds
    });

    // Set header and send back token
    res.header("authToken", token).send(token);
  },
};

module.exports = controller;
