const express = require("express");
const app = express();
const connectDB = require("./datebase/db");
connectDB();
const router = require("./router");
app.use("/librouter", router);
app.listen(30000, () => console.log("server is started"));
