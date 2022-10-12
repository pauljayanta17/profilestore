const { body, validationResult } = require("express-validator");
const User = require("../models/UserSchema");
const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Profile = require("../models/ProfileSchema");

router.post(
  "/addprofile",
  fetchUser,
  [
    body("name", "Name is too short").isLength({ min: 5 }),
    body("email", "Email is invalid").isEmail(),
    body("address", "Address no too short").isLength({ min: 7 }),
    body("city", "city is required").isLength({ min: 4 }),
    body("pincode", "pincode is invalid").isNumeric(),
    body("linkedin", "linkedinLink is invalid").isURL(),
    body("github", "github link is invalid").isURL(),
    body("facebook", "facebook link is invalid").isURL(),
    body("twitter", "twitter link is invalid").isURL(),
    body("projectsLinks", "projectsLinks link is invalid").isString(),
  ],
  async (req, res) => {
    try {
      const {
        name,
        email,
        address,
        city,
        pincode,
        github,
        linkedin,
        facebook,
        twitter,
        projectsLinks,
      } = req.body;
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json({ error: err.array() });
      }

      const profile = new Profile({
        name:name,
        email:email,
        address:address,
        city:city,
        pincode:pincode,
        github:github,
        linkedin:linkedin,
        facebook:facebook,
        twitter:twitter,
        projectsLinks:projectsLinks,
        user: req.user.id,
      });
      
      const savedProfile = await profile.save();
      return res.status(200).json({ savedProfile });
    } catch (error) {
      return res.status(500).json({ error: "something went wrong" });
    }
  }
);

router.get("/fetchallprofile", fetchUser, async (req, res) => {
  const profile = await Profile.find({ user: req.user.id });
  return res.status(200).json({ profile });
});

router.put("/updateprofile/:id", fetchUser, async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      city,
      pincode,
      github,
      linkedin,
      facebook,
      twitter,
      projectsLinks,
    } = req.body;
    const newProfile = {};
    if (name) {
      newProfile.name = name;
    }
    if (email) {
      newProfile.email = email;
    }
    if (address) {
      newProfile.address = address;
    }
    if (github) {
      newProfile.github = github;
    }
    if (projectsLinks) {
      newProfile.projectsLinks = projectsLinks;
    }
    if (linkedin) {
      newProfile.linkedin = linkedin;
    }
    if (facebook) {
      newProfile.facebook = facebook;
    }
    if (twitter) {
      newProfile.twitter = twitter;
    }
    if (city) {
      newProfile.city = city;
    }
    if (pincode) {
      newProfile.pincode = pincode;
    }
    let profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    if (profile.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Access denided" });
    }
    profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { $set: newProfile },
      { new: true }
    );
    return res.status(200).json({ profile });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/deleteprofile/:id", fetchUser, async (req, res) => {
  try {
    let profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: "profile not found" });
    }
    if (profile.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Access denided" });
    }
    profile = await Profile.findByIdAndDelete(req.params.id);
    res.status(200).json({ error: "Successfully deleted", profile });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
