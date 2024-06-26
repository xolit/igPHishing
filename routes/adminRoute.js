const express = require("express");
const router = require(express.Router());
const User = require("../models/schema");

// admin page function
router.get("/admin", async (req, res) => {
  try {
    // Fetch data from MongoDB Atlas
    const data = await User.find();
    // Render the admin.ejs file and pass the fetched data
    res.render("admin.ejs", { foo: "FOO", data });
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
