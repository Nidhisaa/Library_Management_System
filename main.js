const express = require("express");
const app = express();
const connectDB=require("./datebase/db")
connectDB();
app.listen(30000,()=>console.log("server is started"));