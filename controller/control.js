const LIB = require("../models/schema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  GetAll: async (req, res) => {
    try {
      const books = await LIB.find();
      if (books.length > 0) {
        res.status(200).send(books);
      } else {
        res.status(404).send("No books available");
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  GetByName: async (req, res) => {
    try {
      const name = req.params.name;
      const getbook = await LIB.find({
        name: { $regex: new RegExp(name, "i") },
      });
      if (book) {
        res.status(200).send(book);
      } else {
        res.status(404).send("Book not found");
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  GetById: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const book = await LIB.findOne({ id: id });
      if (book) res.status(200).send(book);
      else res.status(404).send("Book not found");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

   GetBooksRange: async (req, res) => {
    try {
      const start = req.params.start;
      const end = req.params.end;
      const skipCount = start - 1;
      const limitCount = end - start + 1;

      const books = await LIB.find().skip(skipCount).limit(limitCount);
      res.status(200).send(books);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  SortByAuthor: async (req, res) => {
    try {
      const author = req.params.author;
      const allBooks = await LIB.aggregate([
        {
          $addFields: {
            priority: { $cond: [{ $eq: ["$author", author] }, 0, 1] },
          },
        },
        { $sort: { priority: 1 } },
      ]);

      if (allBooks.length > 0) res.status(200).send(allBooks);
      else res.status(404).send("Author not found");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  SortByDate: async (req, res) => {
    try {
      const order = Number(req.params.order);
      if (order !== 1 && order !== -1) {
        return res
          .status(400)
          .send({ error: "Invalid order, must be 1 (asc) or -1 (desc)" });
      }

      const books = await LIB.find().sort({ createdAt: order });
      res.status(200).send(books);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  AddBook: async (req, res) => {
    try {
      const lastBook = await LIB.findOne().sort({ id: -1 });
      const nextId = lastBook ? lastBook.id + 1 : 1;

      const book = new LIB({
        ...req.body,
        id: nextId,
        createdAt: new Date(),
      });

      await book.save();
      res.status(201).send(book);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

   GetAuth: async (req, res) => {
    const id = req.body.id;
    const author = req.body.author;
    console.log(id, author);
    const user = await LIB.findOne({ id: id });
    if (!user) {
      return res.status(404).send("User not found");
    }
    try {
      const token = jwt.sign(
        { id: user.id, author: user.author },
        process.env.JWT_SECRET, // or a hardcoded secret
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  DeleteById: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const result = await LIB.deleteMany({ id: id });

      if (result.deletedCount > 0) res.status(200).send(result);
      else res.status(404).send("Book not found");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  DeleteByName: async (req, res) => {
    try {
      const name = req.params.name;
      const result = await LIB.deleteOne({ name: name });

      if (result.deletedCount > 0) res.status(200).send(result);
      else res.status(404).send("Book not found");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  UpdateById: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;

      const book = await LIB.findOneAndUpdate({ id: id }, updates, {
        new: true,
      });

      if (!book) res.status(404).send("Book not found");
      else res.status(200).send(book);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
 
};
