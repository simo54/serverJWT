const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const isTokenAvailable = req.header("authToken");

  if (!isTokenAvailable) {
    res.status(401).send("Acces denied");
    return;
  }

  try {
    const isTokenVerified = jwt.verify(
      isTokenAvailable,
      process.env.TOKEN_AUTH
    );
    req.user = isTokenVerified;
    next();
  } catch (e) {
    res.status(400);
    console.log(e);
  }
};

module.exports = verifyToken;
