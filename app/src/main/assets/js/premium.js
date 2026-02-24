VI.register("premium", {

  init() {},

  trigger() {

    const chatArea = document.getElementById("chatArea");
    if (!chatArea) return;

    const card = document.createElement("div");
    card.className = "message ai";

    card.innerHTML = `
      <div class="go-card">
        <p>
          <b>Try Nova Pro</b><br>
          Faster replies • Unlimited chats
        </p>
        <button class="go-upgrade">Upgrade</button>
      </div>
    `;

    chatArea.appendChild(card);
  }

});
