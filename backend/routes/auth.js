const express = require("express");
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const priavetKey = process.env.PRIVATE_KEY;
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

const { body, validationResult } = require("express-validator");
router.post(
  "/createuser",
  [
    body("name", "Name must be atleast 4character").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter strong password").isStrongPassword(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { name, email, password } = req.body;
    // check if user already exists or not ?
    try {
      const salt = await bcrypt.genSalt(10);
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }
      // create a encrypted password
      const securePassword = await bcrypt.hash(password, salt);
      user = await User.create({
        name: name,
        email: email,
        password: securePassword,
      }).catch((e) => console.log(e));
      // jwt create token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, priavetKey);
      res.status(200).json({ authToken });
    } catch (e) {
      return res.status(500).json({ error: "something went wrong" });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter strong password").isStrongPassword(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(203).json({ error: "Invalid credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        res.status(401).json({ error: "Invalid credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, priavetKey);
      res.status(200).json({ authToken });
    } catch (error) {
      return res.status(401).json({ error: "something went wrong" });
    }
  }
);

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findById(userId).select("-password");
    return res.status(200).json({ userDetails });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
