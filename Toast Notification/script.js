let toastBox = document.getElementById("toastBox");
let successMessage =
  '<i class="fa-solid fa-circle-check"></i> Succesfully Submitted';
let errorMessage =
  '<i class="fa-solid fa-circle-xmark"></i> Please fix the error!';
let invalidMessage =
  '<i class="fa-solid fa-circle-exclamation"></i> Invalid input, check again';

function showToast(Message) {
  let toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = Message;
  toastBox.appendChild(toast);

  if (Message.includes("error")) {
    toast.classList.add("error");
  }
  if (Message.includes("Invalid")) {
    toast.classList.add("invalid");
  }

  setTimeout(() => {
    toast.remove();
  }, 4000);
}
