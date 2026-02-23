// ===============================
// VI Engine - Advanced Loader v4
// ===============================

(function () {

  // ===============================
  // GLOBAL NAMESPACE
  // ===============================

  window.VI = window.VI || {};

  VI.version = "4.0.0";
  VI.modules = {};
  VI.loadedScripts = new Set();
  VI.events = {};
  VI.debug = true;

  log("VI Engine Booting...");

  function log(msg) {
    if (VI.debug) console.log("[VI]", msg);
  }

  // ===============================
  // EVENT BUS SYSTEM
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
  // SEQUENTIAL SCRIPT LOADER
  // ===============================

  function loadScriptsSequentially(scripts, callback) {
    if (!scripts.length) {
      log("All modules loaded.");
      if (callback) callback();
      return;
    }

    const src = scripts.shift();

    // Prevent duplicate loading
    if (VI.loadedScripts.has(src)) {
      loadScriptsSequentially(scripts, callback);
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.defer = true;

    script.onload = function () {
      VI.loadedScripts.add(src);
      log(`Loaded: ${src}`);
      loadScriptsSequentially(scripts, callback);
    };

    script.onerror = function () {
      console.error("[VI] Failed to load:", src);
    };

    document.head.appendChild(script);
  }

  // ===============================
  // MODULE REGISTRATION
  // ===============================

  VI.register = function (name, module) {
    if (VI.modules[name]) {
      console.warn(`[VI] Module already registered: ${name}`);
      return;
    }

    VI.modules[name] = module;
    log(`Module registered: ${name}`);
  };

  // ===============================
  // INITIALIZATION SYSTEM
  // ===============================

  VI.init = function () {
    Object.keys(VI.modules).forEach(name => {
      const module = VI.modules[name];
      if (typeof module.init === "function") {
        module.init();
      }
    });

    VI.emit("ready");
    log("VI Engine Initialized Successfully 🚀");
  };

  // ===============================
  // MODULE LIST
  // ===============================

  const scripts = [
    "core.js",
    "sidebar.js",
    "chat.js",
    "premium.js",
    "attach.js",
    "init.js"
  ];

  // ===============================
  // START LOADING
  // ===============================

  loadScriptsSequentially([...scripts], function () {
    VI.init();
  });

})();
