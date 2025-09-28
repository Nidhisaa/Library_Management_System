
const express = require("express");
const router = express.Router();
const control = require("../controller/control");
const AuthMiddleware = require('../controller/AuthMiddleware'); 
router.get("/", control.GetAll);
router.get("/get/name/:name", control.GetByName);
router.get("/get/id/:id", control.GetById);
router.get("/sort/author/:author", control.SortByAuthor);
router.get("/sort/date/:order", control.SortByDate);
router.post("/add",AuthMiddleware, control.AddBook);
router.delete("/delete/:id",AuthMiddleware, control.DeleteById);
router.delete("/delete/name/:name",AuthMiddleware, control.DeleteByName);
router.put("/update/:id",AuthMiddleware, control.UpdateById);
router.get("/books/range/:start/:end", control.GetBooksRange);
router.post("/auth",AuthMiddleware, control.GetAuth);

module.exports = router;