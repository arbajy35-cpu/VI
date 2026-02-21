// ===============================
// SIDEBAR
// ===============================

window.initSidebar = function () {

  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const menuBtn = document.getElementById("menuBtn");
  const closeSidebar = document.getElementById("closeSidebar");

  function closeSide() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  }

  menuBtn?.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.add("show");
  });

  closeSidebar?.addEventListener("click", closeSide);
  overlay?.addEventListener("click", closeSide);

};