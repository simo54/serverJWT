// Test Route to check if authentication works
const router = require("express").Router();
const verifytoken = require("../verification/verifyToken");

// Passing the verifytoken for cheching if user logged in
router.get("/", verifytoken, (req, res) => {
  res.json({
    data: {
      object: "Secret Title",
      desccription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet nunc accumsan massa varius pellentesque. Aliquam elit ante, posuere eget lacus a, aliquam euismod metus. Suspendisse ac congue tortor. In eget ante non nisi dictum imperdiet a non libero. Duis non metus imperdiet, elementum libero mattis, vestibulum quam. Nullam eu erat vel purus euismod porta eu luctus massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;",
    },
  });
});

module.exports = router;
