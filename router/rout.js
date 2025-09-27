
const express = require("express");
const router = express.Router();
const control = require("../controller/control");

router.get("/", control.GetAll);
router.get("/get/name/:name", control.GetByName);
router.get("/get/id/:id", control.GetById);
router.get("/sort/author/:author", control.SortByAuthor);
router.get("/sort/date/:order", control.SortByDate);
router.post("/add", control.AddBook);
router.delete("/delete/:id", control.DeleteById);
router.delete("/delete/name/:name", control.DeleteByName);
router.put("/update/:id", control.UpdateById);

module.exports = router;