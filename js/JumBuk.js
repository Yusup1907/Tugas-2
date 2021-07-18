const booksLength = () => {
  const jumlahBuku = document.getElementById("jumlahBuku");
  jumlahBuku.innerText = books.length;
};

addButton.addEventListener("click", () => {
  modal.classList.toggle("modal-open");
});
closeModal.addEventListener("click", () => {
  modal.style.transition = "1s";
  modal.classList.toggle("modal-open");
});

