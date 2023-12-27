const bookDisplay = document.querySelector(".bookDisplay");

const addBookBtn = document.querySelector(".addBook");
const addBookDialog = document.querySelector("#addBookDialog");
const bookForm = addBookDialog.querySelector("form");
const confirmBtn = addBookDialog.querySelector("#confirmBtn");
const cancelBtn = addBookDialog.querySelector("#cancelBtn");
const titleForm = addBookDialog.querySelector("#title");
const authorForm = addBookDialog.querySelector("#author");
const numberForm = addBookDialog.querySelector("#pages");
const isReadCheckbox = addBookDialog.querySelector("#isReadCheck");

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

function Book(title, author, pages, isRead) {
  this.title = title;
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

Book.prototype.handleButtonClick = function (readTrueBtn, readFalseBtn) {
  this.toggleReadStatus(readTrueBtn, readFalseBtn);
  this.setActiveButton(readTrueBtn, readFalseBtn);
};

function displayBook(newBook) {
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

  let bookTitle = document.createElement("div");
  bookTitle.textContent = "Title: " + newBook.title;
  bookCardElements.appendChild(bookTitle);

  let bookAuthor = document.createElement("div");
  bookAuthor.textContent = "Author: " + newBook.author;
  bookCardElements.appendChild(bookAuthor);

  let bookPages = document.createElement("div");
  bookPages.textContent = "Pages: " + newBook.pages;
  bookCardElements.appendChild(bookPages);

  let removeIconContainer = document.createElement("div");
  let removeIcon = document.createElement("img");
  removeIconContainer.classList.add("removeIcon");
  removeIcon.src = "./images/delete.svg";
  bookCard.appendChild(removeIconContainer);
  removeIconContainer.appendChild(removeIcon);
  removeIcon.addEventListener("click", function () {
    removeBook(newBook, bookCard);
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

  newBook.setActiveButton(readTrueBtn, readFalseBtn);

  readTrueBtn.addEventListener("click", () =>
    newBook.handleButtonClick(readTrueBtn, readFalseBtn)
  );
  readFalseBtn.addEventListener("click", () =>
    newBook.handleButtonClick(readTrueBtn, readFalseBtn)
  );
}

const preMadeBook = new Book(
  "The Hitchhiker's Guide to the Galaxy",
  "Douglas Adams",
  224,
  true
);
myLibrary.push(preMadeBook);
displayBook(preMadeBook);

function addBookToLibrary(title, author, pages, isReadChecked) {
  let newBook = new Book(title, author, pages, isReadChecked);
  myLibrary.push(newBook);
  displayBook(newBook);
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
function resetDisplay() {
  bookDisplay.innerHTML = "";
}
addBookBtn.addEventListener("click", () => {
  addBookDialog.showModal();
  document.getElementById("addBookDialog").classList.add("active");
});
confirmBtn.addEventListener("click", (event) => {
  if (bookForm.checkValidity()) {
    const title = titleForm.value;
    const author = authorForm.value;
    const pages = numberForm.value;
    const isReadChecked = isReadCheckbox.checked;
    addBookToLibrary(title, author, pages, isReadChecked);
    event.preventDefault();
    bookForm.reset();
    addBookDialog.close();
  }
});
cancelBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addBookDialog.close();
  document.getElementById("addBookDialog").classList.remove("active");
});
document.addEventListener("click", (event) => {
  if (event.target === addBookDialog) {
    addBookDialog.close();
    document.getElementById("addBookDialog").classList.remove("active");
  }
});
