const mongoose = require("mongoose");
async function connectdb() {
  const connection = mongoose.connect(
    "mongodb+srv://test_user_a:yVjZ7ONGFB173YmP@cluster0.a82xa8k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Database connected");
}
module.exports = connectdb;