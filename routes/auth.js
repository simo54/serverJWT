const router = require("express").Router();
const userController = require("../controller/user");

router.post("/register", userController.signup);

module.exports = router;
