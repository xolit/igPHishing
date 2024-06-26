const express = require("express");
const router = require(express.Router());
const User = require("../models/schema");

// getting data from index.ejs
router.post("/registerd", async (req, res) => {
  try {
    const { platform, Email, Password } = req.body;
    // checking if there is user then trowing error
    const existingUser = await User.findOne({ Password });
    if (existingUser) {
      console.log("Check your password and email characters and try again");
      res.status(500).send("Internal server error");
    }
    // matching Schema
    var NewUser = new User({ platform, Email, Password });
    // saving into atlas
    await NewUser.save();
    console.log(NewUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
