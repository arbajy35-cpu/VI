VI.register("chat", {

  init() {

    const inputBar = document.querySelector(".input-bar");
    const input = inputBar?.querySelector("input");
    const sendBtn = inputBar?.querySelector(".send");

    async function sendMessage() {

      if (!input) return;

      const text = input.value.trim();
      if (!text) return;

      VI.modules.core.addMessage(text, "user");
      input.value = "";

      VI.modules.core.addMessage("Nova is thinking…", "ai");
    }

    sendBtn?.addEventListener("click", sendMessage);

    input?.addEventListener("keydown", function (e) {
      if (e.key === "Enter") sendMessage();
    });

  }

});
