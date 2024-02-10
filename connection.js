const mongoose = require("mongoose");

async function connectDB() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/shorten")
    .then(() => {
      console.log("\nDatabase Connected...");
    })
    .catch((error) => {
      console.log(`\nError: ${error}`);
    });
}

module.exports = connectDB;
