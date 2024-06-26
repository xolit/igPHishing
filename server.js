const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const adminRoute = require("./routes/adminRoute.js");
const registerdRoute = require("./routes/registerdRoute.js");
const conn = require("./database/db.js");

const app = express();
app.use(express.json());

app.set("view engine", "ejs");
app.set("views");

conn();

app.get("/", (req, res) => {
  res.render("index.ejs", { foo: "FOO" });
});

app.use("/admin", adminRoute);
app.use("/registerd", registerdRoute);

app.listen(3000, () => {
  console.log("server is running");
});
