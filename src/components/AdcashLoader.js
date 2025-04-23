import { useEffect } from "react";

const AdcashLoader = () => {
  useEffect(() => {
    const existingScript = document.getElementById("aclib-script");
    const bannerContainer = document.getElementById("adcash-banner");

    // ✅ Remove any previously created banner
    if (bannerContainer && bannerContainer.hasChildNodes()) {
      bannerContainer.innerHTML = "";
    }

    // ✅ If script already exists, just run the banner (don't reload script)
    if (existingScript) {
      if (window.aclib && typeof window.aclib.runBanner === "function") {
        window.aclib.runBanner({ zoneId: "9864282" });
      }
      return;
    }

    // ✅ Create and load Adcash library
    const script = document.createElement("script");
    script.id = "aclib-script";
    script.type = "text/javascript";
    script.src = "//acscdn.com/script/aclib.js";
    script.async = true;

    script.onload = () => {
      if (window.aclib) {
        window.aclib.autoTagEnabled = false;
        window.aclib.runBanner({ zoneId: "9864282" });
      }
    };

    document.head.appendChild(script);
  }, []);

  return <div id="adcash-banner" className="adcash-banner" style={{ position: "fixed", bottom: 0, width: "100%", zIndex: 9999 }}></div>;
};

export default AdcashLoader;
