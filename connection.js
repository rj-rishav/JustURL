const mongoose = require("mongoose");

async function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('\nDatabase Connected...')
    })
    .catch((error) => {
      console.log(`\nError: ${error}`);
    });
}

module.exports = connectDB;
