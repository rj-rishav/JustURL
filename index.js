const express = require("express");
const connectDB = require("./connection");
const router = require("./routes/urlRoute");

const errorMidleware = require("./middlewares/errorMiddleware");

connectDB();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

app.use(errorMidleware);

app.listen(process.env.PORT || 3001, () => {
  console.log(`\nServer started...`);
});
