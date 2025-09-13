const mongoose = require("mongoose");
const { Schema } = mongoose;
const Lib = new Schema({
  id: { type: Number, index: true },
  name: { type: String, index: true },
  author: { type: String },
   time: { type: Date, default: () => new Date(Date.now() + 5.5 * 60 * 60 * 1000) },
  avalibility:{type: Boolean,default: true}

});

module.exports = mongoose.model("lib", Lib);
