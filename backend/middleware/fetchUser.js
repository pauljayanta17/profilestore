const jwt = require("jsonwebtoken");
const priavetKey = process.env.PRIVATE_KEY;

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, priavetKey);
    req.user = data.user;
    next()
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchUser;
