// ===============================
// ATTACHMENT SYSTEM
// ===============================

window.initAttach = function () {

  const attachSheet = document.getElementById("attachSheet");
  const attachOverlay = document.getElementById("attachOverlay");
  const plusBtn = document.querySelector(".plus");

  plusBtn?.addEventListener("click", () => {

    attachSheet.classList.add("show");

    attachOverlay.classList.add("show");

  });

  attachOverlay?.addEventListener("click", window.closeAttach);

};

window.closeAttach = function () {

  document.getElementById("attachSheet")?.classList.remove("show");

  document.getElementById("attachOverlay")?.classList.remove("show");

};

window.openCamera = function () {
  document.getElementById("cameraInput")?.click();
};

window.openPhotos = function () {
  document.getElementById("photoInput")?.click();
};

window.openFiles = function () {
  document.getElementById("fileInput")?.click();
};