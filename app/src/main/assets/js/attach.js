VI.register("attach", {

  init() {

    const attachSheet = document.getElementById("attachSheet");
    const attachOverlay = document.getElementById("attachOverlay");
    const plusBtn = document.querySelector(".plus");

    plusBtn?.addEventListener("click", () => {
      attachSheet?.classList.add("show");
      attachOverlay?.classList.add("show");
    });

    attachOverlay?.addEventListener("click", () => {
      attachSheet?.classList.remove("show");
      attachOverlay?.classList.remove("show");
    });

  }

});
