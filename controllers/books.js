const { getDbBooks, saveDbBook, deleteDbBook } = require("../models/books");
function getBooks(req, res, next) {
  getDbBooks((error, result) => {
    if (error) {
      const messages = "Something went wrong";
      return res.status(400).json({
        success: false,
        error:messages,
      });
    }
    return res.status(200).json({
      success: true,
      data: result,
    })
  });
}

exports.getBooks = getBooks;

function saveBook(req, res, next) {
  saveDbBook(req.body, (error, result) => {
    if (error) {
      const messages = "Something went wrong";
      return res.status(400).json({
        success: false,
        error:messages,
      });
    }
    return res.status(200).json({
      success: true,
      data: result,
    })
  });
}

exports.saveBook = saveBook;

function deleteBook(req, res, next) {
  const response = deleteDbBook(req.params.id);
  console.log(response);
}
exports.deleteBook = deleteBook;
