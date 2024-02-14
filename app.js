require("dotenv").config();
const express = require("express");
const connectDB = require("./connection");
const router = require("./routes/urlRoute");
const axios = require("axios");

const errorMidleware = require("./middlewares/errorMiddleware");

connectDB();
const app = express();

app.set("view engine", "ejs");
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", router);
app.get("/", async (req, res) => {
  const response = await axios.get("http://localhost:5005/api/urls");
  const data = response.data;
  res.render("home", { data });
});

app.use(errorMidleware);

app.listen(process.env.PORT || 3001, () => {
  console.log(`\nServer started at ${process.env.PORT}...`);
});
