const database = require("../config/database");

function getDbBooks(callback) {
  let sql = "SELECT * FROM books";
  return database.query(sql, callback);
}

exports.getDbBooks = getDbBooks;

function getDbBook(isbn ,callback) {
  let sql = `SELECT * FROM books WHERE isbn = ${isbn}`;
  return database.query(sql, callback);
}

exports.getDbBook = getDbBook;

function saveDbBook(book, callback) {
  let sql = "INSERT INTO books set ?";
  database.query(sql, book,  callback);
}

exports.saveDbBook = saveDbBook;

function updateDbBook(book, callback) {
  let sql = 'UPDATE books set title = ?, author = ? WHERE isbn = ?';
  database.query(sql,[book.title, book.author, book.isbn], callback);
}

exports.updateDbBook = updateDbBook;

function deleteDbBook(isbn, callback) {
  let sql = `DELETE FROM books WHERE isbn = ${isbn}`;
  database.query(sql, callback);
}

exports.deleteDbBook = deleteDbBook;
