const router = require("express").Router();
const userController = require("../controller/user");
const { body, validationResult } = require("express-validator");

router.post(
  "/register",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail().isLength({ min: 3 }),
    body("password").isLength({ min: 6 }),
  ],
  userController.signup
);

router.post(
  "/login",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail().isLength({ min: 3 }),
    body("password").isLength({ min: 6 }),
  ],
  userController.login
);

module.exports = router;
