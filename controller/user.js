const User = require("../model/User");

const controller = {
  signup: async (req, res) => {
    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password,
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
