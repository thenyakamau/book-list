//Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI Class: Handles UI Task
class UI {
  static displayBooks() {
    Store.getBooks()
      .then((res) => {
        res.data.forEach((book) => UI.addBookToList(book));
      })
      .then((error) => {
        console.log(error);
      });
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");
    row.innerHTML = `<td>${book.title}</td>
     <td>${book.author}</td> 
    <td>${book.isbn}</td>
     <td><a href="#" class = "btn btn-danger btn-sm delete">x</a></td>`;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    //Vanish in three seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

//Store Class: Handles Storage
class Store {
  static getBooks() {
    return new Promise((resolve, reject) => {
      fetch("/api/v1/items", { method: "GET" })
        .then((res) => res.json())
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//Event: Displaying Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  //Prevent actual submit
  e.preventDefault();

  //Get Form Values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //Validate
  if (!title || !author || !isbn) {
    return UI.showAlert("Please input all fields", "warning");
  }

  //Instatiate a book
  const book = new Book(title, author, isbn);

  //Add Book to UI
  UI.addBookToList(book);

  //Save Book
  Store.addBook(book);

  //Show Success Message
  UI.showAlert("Book Added", "success");

  //Clear Fields
  UI.clearFields();
});

//Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  //Remove Book from UI
  UI.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //Show Remove Message
  UI.showAlert("Book Removed", "success");
});
