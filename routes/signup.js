// Signup Route
const router = require("express").Router();
const userController = require("../controller/user");
const { body } = require("express-validator");

router.post(
  "/",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail().isLength({ min: 3 }),
    body("password").isLength({ min: 6 }),
  ],
  userController.signup
);

module.exports = router;
