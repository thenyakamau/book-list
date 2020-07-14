const express = require("express");
const router = express.Router();
const { getBooks, saveBook , deleteBook} = require("../controllers/books");

router.route("/").get(getBooks).post(saveBook);
router.route("/:id").delete(deleteBook);

module.exports = router;