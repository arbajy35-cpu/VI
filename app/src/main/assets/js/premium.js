// ===============================
// PREMIUM SYSTEM
// ===============================

window.triggerProIntro = function () {

  if (window.premiumTriggered) return;

  window.premiumTriggered = true;

  const chatArea = document.getElementById("chatArea");

  if (!chatArea) return;

  const card = document.createElement("div");

  card.className = "message ai";

  card.innerHTML = `
    <div class="go-card">
      <p>
        <b>Try Nova Pro</b><br>
        Faster replies • Unlimited chats • Nova-X reasoning
      </p>
      <button class="go-upgrade">Upgrade</button>
    </div>
  `;

  chatArea.appendChild(card);

  card.querySelector(".go-upgrade").onclick = window.openPremium;

};

window.openPremium = function () {

  const overlay = document.getElementById("premiumOverlay");
  const sheet = document.getElementById("premiumSheet");

  overlay.style.display = "block";

  sheet.style.transform = "translateY(0)";

};

window.closePremium = function () {

  const overlay = document.getElementById("premiumOverlay");
  const sheet = document.getElementById("premiumSheet");

  sheet.style.transform = "translateY(100%)";

  setTimeout(() => {

    overlay.style.display = "none";

  }, 300);

};