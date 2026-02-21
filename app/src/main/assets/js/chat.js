// ===============================
// CHAT SYSTEM
// ===============================

window.initChat = function () {

  const inputBar = document.querySelector(".input-bar");
  const input = inputBar?.querySelector("input");
  const sendBtn = inputBar?.querySelector(".send");

  const actionButtons = document.querySelectorAll(".actions button");

  async function sendMessage() {

    if (!input) return;

    const text = input.value.trim();

    if (!text) return;

    window.addMessage(text, "user");

    input.value = "";

    const typing = window.addMessage("Nova is thinking…", "ai typing");

    try {

      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text
        })
      });

      const data = await res.json();

      typing?.remove();

      window.addMessage(data.answer || "No response", "ai");

    } catch {

      typing?.remove();

      window.addMessage("Server not reachable", "ai");

    }

    if (!window.premiumTriggered && Math.random() < window.PRO_POPUP_CHANCE) {

      setTimeout(window.triggerProIntro, 800);

    }

  }

  sendBtn?.addEventListener("click", sendMessage);

  input?.addEventListener("keydown", function (e) {

    if (e.key === "Enter") sendMessage();

  });

  actionButtons.forEach(btn => {

    btn.addEventListener("click", function () {

      input.value = btn.innerText + " ";

      input.focus();

    });

  });

};