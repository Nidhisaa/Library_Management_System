const express = require("express");
const app = express();
const connectDB = require("./datebase/db");
connectDB();
app.use(express.json());
const router = require("./router/rout");
app.use("/node", router);
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

