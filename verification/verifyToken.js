const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Check if token is available inside the header
  const isTokenAvailable = req.header("authToken");

  // Checking if token is valid
  if (!isTokenAvailable) {
    res.status(401).send("Acces denied");
    return;
  }

  try {
    // If token is available, verify with jwt verify and .env secretpassword
    const isTokenVerified = jwt.verify(
      isTokenAvailable,
      process.env.TOKEN_AUTH
    );
    req.user = isTokenVerified;
    next();
  } catch (e) {
    res.status(400).send("Something went wrong");
    console.log(e);
  }
};

module.exports = verifyToken;
