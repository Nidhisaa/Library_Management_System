const express = require("express");
const app = express();
const connectDB = require("./database/db");
connectDB();
app.use(express.json());
const router = require("./router");
app.use("/librouter", router);
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

