const dialog = document.querySelector("#createFolderDialog");
const showButton = document.querySelector("#createFolderBtn");
const closeButton = document.querySelector("#closeCreateFolderBtn");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});
