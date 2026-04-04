(function () {
  "use strict";

  // ---- CONFIG ----
  window.config = {
    loader: 'unity',
    debug: false,
    maxRatio: 16 / 9,
    minRatio: 9 / 16,
    title: 'Subway Surfers',
    numScreenshots: 4,
    unityVersion: '2019.4.18f1',
    unityWebglBuildUrl: 'https://uncopylockdomainhere.github.io/super-hot/SanFrancisco.json',
    fileSize: 35,
    cachedDecompressedFileSizes: {
      'SanFrancisco.asm.code.unityweb': 9077143,
      'SanFrancisco.asm.framework.unityweb': 86369,
      'SanFrancisco.asm.memory.unityweb': 951447,
      'SanFrancisco.data.unityweb': 18323917,
      'SanFrancisco.wasm.code.unityweb': 7279617,
      'SanFrancisco.wasm.framework.unityweb': 90693,
    },
  };

  // ---- LOAD UNITY ----
  const loaders = {
    unity: "https://cdn.jsdelivr.net/gh/testingherokuapp/subwaysurfer/unity.js"
  };

  let loader = loaders[window.config.loader];
  if (!loader) throw Error('Loader not found');

  window.config.unityWebglLoaderUrl =
    "https://cdn.jsdelivr.net/gh/testingherokuapp/subwaysurfer/UnityLoader.2019.2.js";

  // Load Poki SDK
  const sdkScript = document.createElement("script");
  sdkScript.src = "https://cdn.jsdelivr.net/gh/UncopylockDomainHere/super-hot/poki-sdk.js";

  sdkScript.onload = function () {
    const unityScript = document.createElement("script");
    unityScript.src = loader;
    document.body.appendChild(unityScript);
  };

  document.body.appendChild(sdkScript);

  // ---- GAMEMONETIZE SDK ----
  window.SDK_OPTIONS = {
    gameId: "4i34j6xes2vdim7k55nky9w8s7wp1m75",
    onEvent: function (event) {
      console.log("SDK event:", event);
    }
  };

  (function (a, b, c) {
    const d = a.getElementsByTagName(b)[0];
    if (!a.getElementById(c)) {
      const s = a.createElement(b);
      s.id = c;
      s.src = "https://api.gamemonetize.com/sdk.js";
      d.parentNode.insertBefore(s, d);
    }
  })(document, "script", "gamemonetize-sdk");

  // ---- ADS FUNCTIONS ----
  function google_analytics() {
    if (typeof sdk !== 'undefined' && sdk.showBanner) {
      sdk.showBanner();
    }
  }

  setTimeout(google_analytics, 1000);
  setInterval(google_analytics, 65000);

  // ---- SAVE SYSTEM ----
  window.parent.postMessage({ type: "LOAD_GAME" }, "*");

  window.addEventListener("message", (event) => {
    const data = event.data;

    if (data.type === "LOAD_GAME_RESPONSE") {
      if (data.payload) {
        console.log("Loaded save:", data.payload);
        window.savedGameData = data.payload;
      }
    }
  });

  // Hook localStorage
  (function () {
    const originalSetItem = localStorage.setItem;

    localStorage.setItem = function (key, value) {
      window.parent.postMessage({
        type: "SAVE_GAME",
        payload: { key, value }
      }, "*");

      return originalSetItem.apply(this, arguments);
    };
  })();

})();
