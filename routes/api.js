const express = require("express");
const router = express.Router();
const { getBooks, saveBook , deleteBook, updateBook, getBook} = require("../controllers/books");

router.route("/").get(getBooks).post(saveBook);
router.route("/:id").delete(deleteBook).get(getBook);
router.route("/update").post(updateBook);

module.exports = router;