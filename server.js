import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import User from "./models/schema.js";

const app = express();
app.use(express.json());

const conn = await mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.set("view engine", "ejs");
app.set("views");

app.get("/", (req, res) => {
  res.render("index.ejs", { foo: "FOO" });
});

// getting data from index.ejs
app.post("/registerd", async (req, res) => {
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

// admin page function
app.get("/admin", async (req, res) => {
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

app.listen(3000, () => {
  console.log("server is running");
});
