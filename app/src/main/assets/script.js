// Catch any JS error globally and send to Android log
window.onerror = function(msg, url, line, col, error) {
    console.error("JS ERROR:", msg, "line:", line);
    if (window.AndroidLog && typeof window.AndroidLog.logError === "function") {
        window.AndroidLog.logError(`JS ERROR: ${msg} at line ${line}`);
    }
};

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

        // Safe refocus input
        requestAnimationFrame(() => input.focus());

        // AI reply with smooth delay
        setTimeout(() => aiReply(text), 500);
    }

    function addMessage(text, type) {
        const msg = document.createElement("div");
        msg.className = "msg " + type;
        msg.textContent = text; // WebView safe
        chatBox.appendChild(msg);

        // Smooth scroll, safe for WebView
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function aiReply(userText) {
        const t = userText.toLowerCase();
        let reply = "Interesting. Tell me more.";

        if (t.includes("hello") || t.includes("hi")) reply = "Hello bro, I am VI.";
        else if (t.includes("who")) reply = "I am VI — your personal AI assistant.";
        else if (t.includes("help")) reply = "Tell me what you want. I'm ready.";
        else if (t.includes("bye")) reply = "See you soon, bro.";

        addMessage(reply, "ai");
    }

    // Expose to HTML button
    window.sendMessage = sendMessage;

    // ENTER key support
    input.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    });
});
