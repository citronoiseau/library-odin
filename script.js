const bookDisplay = document.querySelector(".bookDisplay");
const addBookBtn = document.querySelector(".addBook");
let isRead;

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

function Book(name, author, pages, isRead) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}
Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};
Book.prototype.setActiveButton = function (trueBtn, falseBtn) {
  if (this.isRead) {
    trueBtn.classList.add("active");
    falseBtn.classList.remove("active");
  } else {
    falseBtn.classList.add("active");
    trueBtn.classList.remove("active");
  }
};

function displayBooks(library) {
  for (const book of library) {
    const bookCard = document.createElement("div");
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

    let removeIconContainer = document.createElement("div");
    let removeIcon = document.createElement("img");
    removeIconContainer.classList.add("removeIcon");
    removeIcon.src = "./images/delete.svg";
    bookCard.appendChild(removeIconContainer);
    removeIconContainer.appendChild(removeIcon);
    removeIcon.addEventListener("click", function () {
      removeBook(book, bookCard);
    });

    let readButtonContainer = document.createElement("div");
    readButtonContainer.classList.add("isReadBtn");
    bookCard.appendChild(readButtonContainer);
    let readTrueBtn = document.createElement("button");
    readTrueBtn.textContent = "Finished";
    let readFalseBtn = document.createElement("button");
    readFalseBtn.textContent = "In progress";
    readButtonContainer.appendChild(readTrueBtn);
    readButtonContainer.appendChild(readFalseBtn);

    function handleButtonClick() {
      book.toggleReadStatus();
      book.setActiveButton(readTrueBtn, readFalseBtn);
    }

    readTrueBtn.addEventListener("click", handleButtonClick);
    readFalseBtn.addEventListener("click", handleButtonClick);
  }
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
