// GLOBAL JS ERROR CATCH (WebView safe)
window.onerror = function (msg, url, line, col, error) {
    console.log("JS ERROR:", msg, "line:", line);
    return true;
};

document.addEventListener("DOMContentLoaded", () => {
    try {
        const chatBox = document.getElementById("chatBox");
        const input = document.getElementById("userInput");

        if (!chatBox || !input) {
            throw new Error("DOM elements missing");
        }

        function addMessage(text, type) {
            const msg = document.createElement("div");
            msg.className = "msg " + type;
            msg.textContent = text;
            chatBox.appendChild(msg);
            chatBox.scrollTop = chatBox.scrollHeight;
        }

        function aiReply(userText) {
            let reply = "OK.";
            const t = userText.toLowerCase();

            if (t.includes("hi") || t.includes("hello")) reply = "Hello, I am VI.";
            else if (t.includes("who")) reply = "I am VI AI.";
            else if (t.includes("bye")) reply = "Bye bro.";

            addMessage(reply, "ai");
        }

        function sendMessage() {
            const text = input.value.trim();
            if (!text) return;

            addMessage(text, "user");
            input.value = "";

            setTimeout(() => aiReply(text), 400);
        }

        window.sendMessage = sendMessage;

        input.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
            }
        });

    } catch (e) {
        console.log("JS FATAL:", e.message);
    }
});