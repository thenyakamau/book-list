const database = require("../config/database");

function getDbBooks(callback) {
  let sql = "SELECT * FROM books";
  return database.query(sql, callback);
}

exports.getDbBooks = getDbBooks;

function saveDbBook(book, callback) {
  let sql = "INSERT INTO books ?";
  database.query(sql, book,  callback);
}

exports.saveDbBook = saveDbBook;

function deleteDbBook(id) {
  let sql = `DELETE FROM books WHERE ID = ${id}`;
  database.query(sql, (error, result) => {
    if (error) return error;
    else return result;
  });
}

exports.deleteDbBook = deleteDbBook;
