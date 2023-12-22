const bookDisplay = document.querySelector(".bookDisplay");
const addBookBtn = document.querySelector(".addBook");

const myLibrary = [];

function displayBooks(library) {
  for (book of library) {
    let bookCard = document.createElement("div");
    bookDisplay.appendChild(bookCard);

    let bookName = document.createElement("div");
    bookName.textContent = "Name: " + book.name;
    bookCard.appendChild(bookName);

    let bookAuthor = document.createElement("div");
    bookAuthor.textContent = "Author: " + book.author;
    bookCard.appendChild(bookAuthor);

    let bookPages = document.createElement("div");
    bookPages.textContent = "Pages: " + book.pages;
    bookCard.appendChild(bookPages);

    let bookRead = document.createElement("div");
    bookRead.textContent = "Read: " + book.isRead;
    bookCard.appendChild(bookRead);
  }
}

function Book(name, author, pages, isRead) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  let newBook = new Book("Tolkin", "Eee", "223", "yes");
  myLibrary.push(newBook);
}

addBookToLibrary();
addBookToLibrary();
displayBooks(myLibrary);
