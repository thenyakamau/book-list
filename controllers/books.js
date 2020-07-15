const { getDbBooks, saveDbBook, deleteDbBook, updateDbBook, getDbBook } = require("../models/books");
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

function getBook(req, res, next) {
  getDbBook(req.params.id,(error, result) => {
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

exports.getBook = getBook;

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
      message: "Book has been added",
    })
  });
}

exports.saveBook = saveBook;

function updateBook(req, res, next) {
  updateDbBook(req.body,  (error, result) => {
    if (error) {
      const messages = "Something went wrong";
      return res.status(400).json({
        success: false,
        error:messages,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book has been updated",
    })
  });
}

exports.updateBook = updateBook;

function deleteBook(req, res, next) {
  deleteDbBook(req.params.id, (error, result) => {
    if (error) {
      const messages = "Something went wrong";
      return res.status(400).json({
        success: false,
        error:messages,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book has been deleted",
    })
  });
}
exports.deleteBook = deleteBook;
