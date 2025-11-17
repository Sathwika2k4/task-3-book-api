const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// In-memory books array
let books = [];

// GET all books
app.get("/books", (req, res) => {
  res.status(200).json(books);
});

// POST add a book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

// PUT update book by ID
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  book.title = title;
  book.author = author;

  res.status(200).json(book);
});

// DELETE book by ID
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  books = books.filter(b => b.id !== id);

  res.status(200).json({ message: "Book deleted successfully" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
