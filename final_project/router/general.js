const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!users.includes(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = Number(req.params.isbn);

  res.send(JSON.stringify(books[isbn], null, 4));
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const bookKeys = Object.keys(books);

  const filteredBooks = bookKeys
    .map((key) => books[key])
    .filter((book) => book.author.toLowerCase() === author.toLowerCase());

  if (filteredBooks.length > 0) {
    return res.send(JSON.stringify(filteredBooks, null, 4));
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const bookKeys = Object.keys(books);

  const filteredBooks = bookKeys
    .map((key) => books[key])
    .filter((book) => book.title.toLowerCase() === title.toLowerCase());

  if (filteredBooks.length > 0) {
    return res.send(JSON.stringify(filteredBooks, null, 4));
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.status(200).json(book.reviews);
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let general = express.Router();

// Route to get all books
general.get("/", function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
general.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
});

// Get book details based on author
general.get("/author/:author", function (req, res) {
  const author = req.params.author;
  let matchingBooks = [];

  for (let key in books) {
    if (books[key].author === author) {
      matchingBooks.push(books[key]);
    }
  }

  res.send(matchingBooks);
});

// Get book details based on title
general.get("/title/:title", function (req, res) {
  const title = req.params.title;
  let matchingBooks = [];

  for (let key in books) {
    if (books[key].title === title) {
      matchingBooks.push(books[key]);
    }
  }

  res.send(matchingBooks);
});

module.exports.general = general;

const getAllBooks = async () => {
  try {
    const response = await axios.get('http://localhost:5000/');
    console.log("All books:", response.data);
  } catch (error) {
    console.error('Error fetching all books:', error.message);
  }
};

// Task 11: Get book by ISBN
const getBookByISBN = async (isbn) => {
  try {
    const response = await axios.get("http://localhost:5000/isbn/${isbn}");
    console.log(`Book with ISBN ${isbn}:, response.data`);
  } catch (error) {
    console.error('Error fetching book by ISBN:', error.message);
  }
};

// Task 12: Get books by author
const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get("http://localhost:5000/author/${author}");
    console.log(`Books by ${author}:, response.data`);
  } catch (error) {
    console.error('Error fetching books by author:', error.message);
  }
};

// Task 13: Get books by title
const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get("http://localhost:5000/title/${title}");
    console.log(`Books with title '${title}':, response.data`);
  } catch (error) {
    console.error('Error fetching books by title:', error.message);
  }
};


module.exports.general = public_users;
