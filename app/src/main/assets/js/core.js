// ===============================
// CORE FUNCTIONS
// ===============================

window.chatStarted = false;
window.premiumTriggered = false;
window.PRO_POPUP_CHANCE = 0.25;

window.startChat = function () {

  if (window.chatStarted) return;
  window.chatStarted = true;

  const hero = document.querySelector(".hero");
  const main = document.querySelector(".main");

  if (hero) hero.style.display = "none";

  const chatArea = document.createElement("div");
  chatArea.id = "chatArea";
  chatArea.className = "chat-area";

  main.appendChild(chatArea);

};

window.addMessage = function(text, type) {

  window.startChat();

  const chatArea = document.getElementById("chatArea");

  if (!chatArea) return null;

  const msg = document.createElement("div");

  msg.className = `message ${type}`;
  msg.textContent = text;

  chatArea.appendChild(msg);

  chatArea.scrollTop = chatArea.scrollHeight;

  return msg;
};