const mongoose = require("mongoose");
require("dotenv").config();
async function connectdb() {
  const connection = mongoose.connect(process.env.MONGODB_URL);
  console.log("Database connected");
}
module.exports = connectdb;
