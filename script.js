const bookDisplay = document.querySelector(".bookDisplay");
const addBookBtn = document.querySelector(".addBook");

const bookIcons = [
  "./bookIcons/explore.svg",
  "./bookIcons/heart.svg",
  "./bookIcons/psychology.svg",
  "./bookIcons/raven.svg",
  "./bookIcons/relax.svg",
  "./bookIcons/science.svg",
  "./bookIcons/secret.svg",
  "./bookIcons/study.svg",
  "./bookIcons/swords.svg",
  "./bookIcons/travel.svg",
];
const myLibrary = [];

function displayBooks(library) {
  for (book of library) {
    let bookCard = document.createElement("div");
    bookDisplay.appendChild(bookCard);

    let bookImageContainer = document.createElement("div");
    bookCard.appendChild(bookImageContainer);

    let bookImage = document.createElement("img");
    let randomImage = Math.floor(Math.random() * bookIcons.length);
    bookImage.src = bookIcons[randomImage];
    bookImageContainer.appendChild(bookImage);

    let bookCardElements = document.createElement("div");
    bookCard.appendChild(bookCardElements);

    let bookName = document.createElement("div");
    bookName.textContent = "Name: " + book.name;
    bookCardElements.appendChild(bookName);

    let bookAuthor = document.createElement("div");
    bookAuthor.textContent = "Author: " + book.author;
    bookCardElements.appendChild(bookAuthor);

    let bookPages = document.createElement("div");
    bookPages.textContent = "Pages: " + book.pages;
    bookCardElements.appendChild(bookPages);

    let bookRead = document.createElement("div");
    bookRead.textContent = "Read: " + book.isRead;
    bookCardElements.appendChild(bookRead);

    let removeIconContainer = document.createElement("div");
    let removeIcon = document.createElement("img");
    removeIconContainer.classList.add("removeIcon");
    removeIcon.src = "./images/delete.svg";
    bookCard.appendChild(removeIconContainer);
    removeIconContainer.appendChild(removeIcon);
    removeIcon.addEventListener("click", function () {
      removeBook(book, bookCard);
    });
  }
}

function Book(name, author, pages, isRead) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary() {
  let newBook = new Book("Tolkin", "Eee", "223", true);
  myLibrary.push(newBook);
}
function removeBook(book, bookCard) {
  const confirmed = window.confirm(
    "Are you sure you want to remove this book?"
  );
  if (confirmed) {
    let position = myLibrary.indexOf(book);
    myLibrary.splice(position, 1);
    bookCard.remove();
  }
}

addBookToLibrary();
addBookToLibrary();
displayBooks(myLibrary);
