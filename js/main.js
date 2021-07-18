const modal = document.querySelector("#col-333");
const addButton = document.getElementById("add-icon");
const closeModal = document.getElementById("close");
const UNCOMPLETED_BOOK_ID = "belumbaca";
const COMPLETED_BOOK_ID = "sudahbaca";
const BOOK_ITEMID = "itemId";

const addBook = () => {
  const uncompletedBook = document.getElementById(UNCOMPLETED_BOOK_ID);
  const inputTitle = document.getElementById("title").value;
  const inputAuthor = document.getElementById("author").value;
  const inputYear = document.getElementById("year").value;

  const book = makeBook(inputTitle, inputAuthor, inputYear, false);
  const bookObject = composeBookObject(
    inputTitle,
    inputAuthor,
    inputYear,
    false
  );

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  uncompletedBook.append(book);
  updateDataToStorage();
};

const makeBook = (title, author, year, isCompleted) => {

  const bookTitle = document.createElement("h3");
  bookTitle.innerText = title;

  const authorName = document.createElement("p");
  authorName.innerText = author;

  const bookYear = document.createElement("small");
  bookYear.innerText = `${year}`;

  const detail = document.createElement("div");
  detail.classList.add("detail-book");
  detail.append(bookTitle, authorName, bookYear);

  const container = document.createElement("div");
  container.append(detail);

  if (isCompleted) {
    container.append(createUnreadButton(), createTrashButton());
  } else {
    container.append(createReadButton(), createTrashButton());
  }
  return container;
};
const addBookToCompleted = (bookElement) => {
  const bookCompleted = document.getElementById(COMPLETED_BOOK_ID);

  const bookTitle = bookElement.querySelector(".detail-book > h3").innerText;
  const bookAuthor = bookElement.querySelector(".detail-book > p").innerText;
  const bookYear = bookElement.querySelector(".detail-book > small").innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = true;
  newBook[BOOK_ITEMID] = book.id;

  bookCompleted.append(newBook);
  bookElement.remove();

  updateDataToStorage();
};
function undoBookToStillRead(bookElement) {
  const listUncompleted = document.getElementById(LIST_BOOK_UNCOMPLETED);

  const el_title_buku = bookElement.querySelector('.item > .inner > h3').innerText;
  const el_author_buku = bookElement.querySelector('.item > .inner > p.author').innerText;
  const el_year_buku = bookElement.querySelector('.item > .inner > p.year').innerText;

  const buku_baru = makeLogBook(el_title_buku, el_author_buku, el_year_buku, false);

  const buku = findBook(bookElement[BOOK_ITEMID]);
  buku.isComplete = false;

  newBook[BOOK_ITEMID] = book.id;
  bookCompleted.append(newBook);

  bookElement.remove();
  updateDataToStorage();
}

const removeBookFromCompleted = (bookElement) => {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);
  bookElement.remove();
  updateDataToStorage();
};


const undoBookFromCompleted = (bookElement) => {
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);

  const bookTitle = bookElement.querySelector(".detail-book > h3").innerText;
  const bookAuthor = bookElement.querySelector(".detail-book > p").innerText;
  const bookYear = bookElement.querySelector(".detail-book > small").innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = false;
  newBook[BOOK_ITEMID] = book.id;

  listUncompleted.append(newBook);
  bookElement.remove();
  updateDataToStorage();
};
const createButton = (buttonTypeClass, eventListener) => {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);

  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
};
const createReadButton = () => {
  return createButton("read-button", function (event) {
    addBookToCompleted(event.target.parentElement);
  });
};
const createTrashButton = () => {
  return createButton("trash-book", function (event) {
    removeBookFromCompleted(event.target.parentElement);
  });
};
const createUnreadButton = () => {
  return createButton("unread-button", function (event) {
    undoBookFromCompleted(event.target.parentElement);
  });
};
