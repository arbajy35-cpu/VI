// ===============================
// NOVA AI — script.js (MAIN LOADER)
// ===============================

window.onerror = function(msg, url, line) {
  console.log("JS ERROR:", msg, "line:", line);
};

import "./core.js";
import "./sidebar.js";
import "./chat.js";
import "./premium.js";
import "./attach.js";
import "./init.js";

console.log("Nova AI Loaded Successfully");