const User = require("../model/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

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
