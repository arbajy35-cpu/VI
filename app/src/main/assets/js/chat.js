VI.register("chat", {

  init() {

    const inputBar = document.querySelector(".input-bar");
    const input = inputBar?.querySelector("input");
    const sendBtn = inputBar?.querySelector(".send");

    // 🔥 Environment Config
    const CONFIG = {
      DEV_API: "http://10.0.2.2:3000/api/chat", // Android emulator fix
      PROD_API: "https://yourdomain.com/api/chat",
      MODE: "DEV" // change to PROD before release
    };

    function getApiUrl() {
      return CONFIG.MODE === "DEV" ? CONFIG.DEV_API : CONFIG.PROD_API;
    }

    async function sendMessage() {

      if (!input) return;

      const text = input.value.trim();
      if (!text) return;

      VI.modules.core.addMessage(text, "user");
      input.value = "";

      const typing = VI.modules.core.addMessage("Nova is thinking…", "ai typing");

      try {

        const res = await fetch(getApiUrl(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message: text })
        });

        if (!res.ok) throw new Error("HTTP " + res.status);

        const data = await res.json();

        typing?.remove();
        VI.modules.core.addMessage(data.answer || "No response", "ai");

      } catch (err) {

        console.error("Chat API Error:", err);

        typing?.remove();
        VI.modules.core.addMessage(
          "⚠ Network error. Check server connection.",
          "ai"
        );
      }
    }

    sendBtn?.addEventListener("click", sendMessage);

    input?.addEventListener("keydown", function (e) {
      if (e.key === "Enter") sendMessage();
    });

  }

});
