/* ===============================
   NOVA AI â€” script.js (FINAL GOD-TIER)
================================ */
window.onerror = function(msg, url, line, col, error) {
    console.log("JS ERROR:", msg, "line:", line);
};

/* ===============================
   GLOBAL CHAT FUNCTIONS
================================ */
let chatStarted = false;
let premiumTriggered = false;
const PRO_POPUP_CHANCE = 0.25;

function startChat() {
  if (chatStarted) return;
  chatStarted = true;

  const hero = document.querySelector(".hero");
  const main = document.querySelector(".main");

  if (hero) hero.style.display = "none";

  const chatArea = document.createElement("div");
  chatArea.id = "chatArea";
  chatArea.className = "chat-area";
  main.appendChild(chatArea);
}

function addMessage(text, type) {
  startChat();
  const chatArea = document.getElementById("chatArea");
  if (!chatArea) return null;

  const msg = document.createElement("div");
  msg.className = `message ${type}`;
  msg.textContent = text;

  chatArea.appendChild(msg);
  chatArea.scrollTop = chatArea.scrollHeight;
  return msg;
}

/* ===============================
   PREMIUM INTRO (CHATGPT STYLE)
================================ */
function triggerProIntro() {
  if (premiumTriggered) return;
  premiumTriggered = true;

  const chatArea = document.getElementById("chatArea");
  if (!chatArea) return;

  const card = document.createElement("div");
  card.className = "message ai";

  card.innerHTML = `
    <div class="go-card">
      <p class="go-text">
        <b>Try Nova Pro</b><br>
        Faster replies â€¢ Unlimited chats â€¢ Nova-X reasoning
      </p>
      <div class="go-actions">
        <button class="go-upgrade">Upgrade</button>
        <span class="go-close">Ã—</span>
      </div>
    </div>
  `;

  chatArea.appendChild(card);
  chatArea.scrollTop = chatArea.scrollHeight;

  card.querySelector(".go-upgrade").onclick = openPremium;
  card.querySelector(".go-close").onclick = () => card.remove();
}

/* ===============================
   DOM READY
================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* ---------- ELEMENTS ---------- */
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const menuBtn = document.getElementById("menuBtn");
  const closeSidebar = document.getElementById("closeSidebar");

  const inputBar = document.querySelector(".input-bar");
  const input = inputBar?.querySelector("input");
  const sendBtn = inputBar?.querySelector(".send");

  const chatHistory = document.querySelector(".chat-history");
  const actionButtons = document.querySelectorAll(".actions button");

  const testBtn = document.getElementById("testBtn");
  const testResult = document.getElementById("testResult");

  /* ===============================
     SIDEBAR
  ================================= */
  menuBtn?.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.add("show");
  });

  function closeSide() {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  }

  closeSidebar?.addEventListener("click", closeSide);
  overlay?.addEventListener("click", closeSide);

  /* ===============================
     SEND MESSAGE
  ================================= */
  async function sendMessage() {
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const typing = addMessage("Nova is thinkingâ€¦", "ai typing");

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();
      typing?.remove();
      addMessage(data.answer || "No response.", "ai");

    } catch {
      typing?.remove();
      addMessage("Server not reachable.", "ai");
    }

    if (!premiumTriggered && Math.random() < PRO_POPUP_CHANCE) {
      setTimeout(triggerProIntro, 800);
    }
  }

  sendBtn?.addEventListener("click", sendMessage);
  input?.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });

  /* ===============================
     ACTION BUTTONS
  ================================= */
  actionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      input.value = btn.innerText + " ";
      input.focus();
    });
  });

  /* ===============================
     CHAT HISTORY RESET
  ================================= */
  chatHistory?.addEventListener("click", e => {
    if (!e.target.classList.contains("chat-item")) return;

    document.querySelectorAll(".chat-item").forEach(i => i.classList.remove("active"));
    e.target.classList.add("active");

    chatStarted = false;
    premiumTriggered = false;

    const main = document.querySelector(".main");
    main.innerHTML = "";
    const hero = document.querySelector(".hero");
    hero.style.display = "block";
    main.appendChild(hero);
  });

  /* ===============================
     TEST SERVER
  ================================= */
  testBtn?.addEventListener("click", async () => {
    testResult.textContent = "Checking server...";
    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Ping" })
      });
      const data = await res.json();
      testResult.textContent = data.answer ? "Server connected!" : "Connected, no reply";
    } catch {
      testResult.textContent = "Server not reachable";
    }
  });

});

/* ===============================
   PREMIUM SHEET â€” GLOBAL
================================ */
function openPremium() {
  const overlay = document.getElementById("premiumOverlay");
  const sheet = document.getElementById("premiumSheet");
  if (!overlay || !sheet) return;

  overlay.style.display = "block";
  sheet.style.transform = "translateY(0)";
}

function closePremium() {
  const overlay = document.getElementById("premiumOverlay");
  const sheet = document.getElementById("premiumSheet");
  if (!overlay || !sheet) return;

  sheet.style.transform = "translateY(100%)";
  setTimeout(() => overlay.style.display = "none", 300);
}

/* ===============================
   ATTACHMENT SHEET
================================ */
const attachSheet = document.getElementById("attachSheet");
const attachOverlay = document.getElementById("attachOverlay");
const plusBtn = document.querySelector(".plus");

plusBtn?.addEventListener("click", () => {
  attachSheet.classList.add("show");
  attachOverlay.classList.add("show");
});

function closeAttach() {
  attachSheet.classList.remove("show");
  attachOverlay.classList.remove("show");
}

function openCamera() {
  document.getElementById("cameraInput").click();
}
function openPhotos() {
  document.getElementById("photoInput").click();
}
function openFiles() {
  document.getElementById("fileInput").click();
}

["cameraInput", "photoInput", "fileInput"].forEach(id => {
  const inp = document.getElementById(id);
  if (!inp) return;

  inp.addEventListener("change", () => {
    if (inp.files.length > 0) {
      addMessage("ðŸ“Ž Attached: " + inp.files[0].name, "user");
      closeAttach();
    }
  });
});
