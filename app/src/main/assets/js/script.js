// ===============================
// VI Engine - Advanced Loader v5 (Stable)
// ===============================

(function () {

  window.VI = window.VI || {};

  VI.version = "5.0.0";
  VI.modules = {};
  VI.loadedScripts = new Set();
  VI.events = {};
  VI.debug = true;
  VI.basePath = detectBasePath();

  log("VI Engine Booting...");

  function log(msg) {
    if (VI.debug) console.log("[VI]", msg);
  }

  function detectBasePath() {
    const currentScript = document.currentScript;
    if (!currentScript) return "/";
    const src = currentScript.src;
    return src.substring(0, src.lastIndexOf("/") + 1);
  }

  // ===============================
  // EVENT BUS
  // ===============================

  VI.on = function (event, callback) {
    if (!VI.events[event]) VI.events[event] = [];
    VI.events[event].push(callback);
  };

  VI.emit = function (event, data) {
    if (!VI.events[event]) return;
    VI.events[event].forEach(cb => cb(data));
  };

  // ===============================
  // SCRIPT LOADER
  // ===============================

  function loadScriptsSequentially(scripts, callback) {
    if (!scripts.length) {
      log("All modules loaded.");
      callback && callback();
      return;
    }

    const src = scripts.shift();
    const fullPath = VI.basePath + src;

    if (VI.loadedScripts.has(fullPath)) {
      loadScriptsSequentially(scripts, callback);
      return;
    }

    const script = document.createElement("script");
    script.src = fullPath;

    script.onload = function () {
      VI.loadedScripts.add(fullPath);
      log("Loaded: " + fullPath);
      loadScriptsSequentially(scripts, callback);
    };

    script.onerror = function () {
      console.error("[VI] FAILED TO LOAD:", fullPath);
    };

    document.head.appendChild(script);
  }

  // ===============================
  // MODULE REGISTER
  // ===============================

  VI.register = function (name, module) {
    if (VI.modules[name]) {
      console.warn("[VI] Module already registered:", name);
      return;
    }

    VI.modules[name] = module;
    log("Module registered: " + name);
  };

  // ===============================
  // INIT SYSTEM
  // ===============================

  VI.init = function () {
    log("Initializing modules...");

    Object.keys(VI.modules).forEach(name => {
      const module = VI.modules[name];
      if (typeof module.init === "function") {
        module.init();
        log("Initialized: " + name);
      }
    });

    VI.emit("ready");
    log("VI Engine Ready 🚀");
  };

  // ===============================
  // MODULE FILE LIST
  // ===============================

  const scripts = [
    "core.js",
    "sidebar.js",
    "chat.js",
    "premium.js",
    "attach.js"
  ];

  // ===============================
  // START ENGINE AFTER DOM READY
  // ===============================

  document.addEventListener("DOMContentLoaded", function () {
    loadScriptsSequentially([...scripts], function () {
      VI.init();
    });
  });

})();
