import { useEffect } from "react";

const AdcashLoader = () => {
  useEffect(() => {
    const existingScript = document.getElementById("aclib-script");
    const bannerContainer = document.getElementById("adcash-banner");

    // 🚫 Remove existing banner children if re-entering the page
    if (bannerContainer && bannerContainer.hasChildNodes()) {
      bannerContainer.innerHTML = "";
    }

    // ✅ If script already exists, just rerun banner
    if (existingScript) {
      if (window.aclib?.runBanner) {
        window.aclib.runBanner({ zoneId: "9864282" });
      }
      return;
    }

    // ✅ Insert the Adcash library
    const script = document.createElement("script");
    script.id = "aclib-script";
    script.type = "text/javascript";
    script.src = "//acscdn.com/script/aclib.js";
    script.async = true;

    script.onload = () => {
      if (window.aclib) {
        // ✅ Force disable auto ad types
        window.aclib.autoTagEnabled = false;
        window.aclib.runPush = () => {};
        window.aclib.runInPagePush = () => {};
        window.aclib.runInterstitial = () => {};
        window.aclib.runAutoTag = () => {};

        // ✅ Load only banner
        window.aclib.runBanner({ zoneId: "9864282" });
      }
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div
      id="adcash-banner"
      className="adcash-banner"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
        textAlign: "center",
      }}
    />
  );
};

export default AdcashLoader;
