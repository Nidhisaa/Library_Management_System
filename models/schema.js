const mongoose = require("mongoose");
const { Schema } = mongoose;
const Lib = new Schema({
  id: { type: Number, index: true },
  name: { type: String, index: true },
  author: { type: String },
  avalibility:{type: Boolean,default: true}

});

module.exports = mongoose.model("lib", Lib);
