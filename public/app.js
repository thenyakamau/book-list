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
        this.showAlert("Something went wrong", "danger");
      });
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");
    row.innerHTML = `<td>${book.title}</td>
     <td>${book.author}</td> 
    <td>${book.isbn}</td>
     <td><a href="#" class = "btn btn-success btn-sm m-1 edit" ><i class="fas fa-pen edit"></i></a> <a href="#" class = "btn btn-danger btn-sm m-1 delete"><i class="fas fa-times"></i></a></td>`;

    list.appendChild(row);
  }

  static displayBook(el) {
    if (el.classList.contains("edit")) {
      const isbn = el.parentElement.previousElementSibling.textContent;
      Store.getBook(isbn)
        .then((res) => this.openModal(res.data[0]))
        .catch((error) => this.showAlert("Something went wrong", "danger"));
    }
  }

  static editBook(book) {
    Store.updateBook(book)
      .then((res) => {
        this.showAlert(res.message, "success");
        this.closeModal();
        window.location.reload();
      })
      .catch((error) => this.showAlert("Something went wrong", "danger"));

    
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      const isbn = el.parentElement.previousElementSibling.textContent;
      Store.removeBook(isbn)
        .then((res) => {
          el.parentElement.parentElement.remove();
          this.showAlert(res.message, "success");
        })
        .catch((error) => this.showAlert("Something went wrong", "danger"));
    }
  }

  static openModal(book) {
    //Get Modal Element
    const modal = document.getElementById("simpleModal");
    document.getElementById("modal-title").value = book.title;
    document.getElementById("modal-author").value = book.author;
    document.getElementById("modal-isbn").value = book.isbn;

    modal.style.display = "block";
  }

  static closeModal() {
    const modal = document.getElementById("simpleModal");
    modal.style.display = "none";
  }

  static outsideClick(e) {
    const modal = document.getElementById("simpleModal");
    if (e.target === modal) {
      modal.style.display = "none";
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

  static getBook(isbn) {
    return new Promise((resolve, reject) => {
      fetch(`/api/v1/items/${isbn}`, { method: "GET" })
        .then((res) => res.json())
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  static addBook(book) {
    return new Promise((resolve, reject) => {
      fetch("/api/v1/items", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      })
        .then((res) => res.json())
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  static updateBook(book) {
    return new Promise((resolve, reject) => {
      fetch("/api/v1/items/update", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      })
        .then((res) => res.json())
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
  }

  static removeBook(isbn) {
    return new Promise((resolve, reject) => {
      fetch(`/api/v1/items/${isbn}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    });
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
  Store.addBook(book)
    .then((res) => UI.showAlert(res.message, "success"))
    .catch((error) => UI.showAlert("Something went wrong", "danger"));

  //Clear Fields
  UI.clearFields();
});

//Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  //Remove Book from UI
  UI.deleteBook(e.target);

  UI.displayBook(e.target);
});

document.querySelector("#modal-form").addEventListener("submit", (e) => {
  const title = document.getElementById("modal-title").value;
  const author = document.getElementById("modal-author").value;
  const isbn = document.getElementById("modal-isbn").value;

  let book = new Book(title, author, isbn);

  UI.editBook(book);
});

document.getElementById("closeBtn").addEventListener("click", (e) => {
  UI.closeModal();
});

window.addEventListener("click", (e) => {
  UI.outsideClick(e);
});
