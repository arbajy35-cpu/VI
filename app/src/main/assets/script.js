document.addEventListener("DOMContentLoaded", () => {

  const chatBox = document.getElementById("chatBox");
  const input = document.getElementById("userInput");

  if (!chatBox || !input) {
    console.error("VI Error: DOM not loaded properly");
    return;
  }

  function sendMessage() {
    const text = input.value.trim();
    if (text.length === 0) return;

    addMessage(text, "user");
    input.value = "";
    input.focus();

    // smooth AI delay (safe for WebView)
    setTimeout(() => {
      aiReply(text);
    }, 500);
  }

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = "msg " + type;
    msg.textContent = text; // textContent = WebView safe
    chatBox.appendChild(msg);

    // smooth scroll (no animation crash)
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function aiReply(userText) {
    const t = userText.toLowerCase();
    let reply = "Interesting. Tell me more.";

    if (t.includes("hello") || t.includes("hi")) {
      reply = "Hello bro, I am VI.";
    } 
    else if (t.includes("who")) {
      reply = "I am VI — your personal AI assistant.";
    } 
    else if (t.includes("help")) {
      reply = "Tell me what you want. I'm ready.";
    } 
    else if (t.includes("bye")) {
      reply = "See you soon, bro.";
    }

    addMessage(reply, "ai");
  }

  // expose to HTML button
  window.sendMessage = sendMessage;

  // ENTER key support
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

});