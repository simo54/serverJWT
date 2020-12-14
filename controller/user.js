const User = require("../model/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const controller = {
  // User Creation
  signup: async (req, res) => {
    // Checking if there is any error on the input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Checking if user already exist
    const isEmailExist = await User.findOne({ email: req.body.email });

    if (isEmailExist) {
      res.status(400).send("Email used");
      return;
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);
    console.log(hashedPwd);

    const user = new User({
      name,
      email,
      password: hashedPwd,
    });
    try {
      const newUser = await user.save();
      console.log(newUser);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
      return;
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    // Checking if user already exist
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(400).send("Email or password wrong");
      return;
    }

    // Checking is password is correct
    const isPwsValid = await bcrypt.compare(password, user.password);

    if (!isPwsValid) {
      res.status(401).send("Invalid password");
    }

    // Jwt token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_AUTH);

    res.send("loggedin");
  },
  // getAllUser: async (req, res) => {
  //   try {
  //     const users = await User.find({});
  //     console.log(users);
  //     res.json(users);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // },
};

module.exports = controller;
