const createFolderDialog = document.querySelector("#createFolderDialog");
const showButton = document.querySelector("#createFolderBtn");
const closeButton = document.querySelector("#closeCreateFolderBtn");

// "Show the createFolderDialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  createFolderDialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  createFolderDialog.close();
});
