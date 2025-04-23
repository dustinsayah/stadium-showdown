import { useEffect } from "react";

const AdcashLoader = () => {
  useEffect(() => {
    // Check if banner already exists in the DOM
    const existingContainer = document.getElementById("adcash-banner");
    const existingScript = document.getElementById("aclib-script");

    if (!existingContainer) {
      const banner = document.createElement("div");
      banner.id = "adcash-banner";
      banner.style.position = "fixed";
      banner.style.bottom = "0";
      banner.style.width = "100%";
      banner.style.zIndex = "9999";
      banner.style.textAlign = "center";
      document.body.appendChild(banner);
    } else {
      // Prevent reinserting if already initialized
      if (existingContainer.hasChildNodes()) return;
    }

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "aclib-script";
      script.src = "//acscdn.com/script/aclib.js";
      script.async = true;

      script.onload = () => {
        if (window.aclib) {
          window.aclib.autoTagEnabled = false;
          window.aclib.runBanner({ zoneId: "9864282" });
        }
      };

      document.head.appendChild(script);
    } else {
      // Script already loaded: run only if banner not rendered yet
      if (window.aclib && typeof window.aclib.runBanner === "function") {
        const bannerDiv = document.getElementById("adcash-banner");
        if (bannerDiv && bannerDiv.childNodes.length === 0) {
          window.aclib.runBanner({ zoneId: "9864282" });
        }
      }
    }
  }, []);

  return null; // We attach to body directly
};

export default AdcashLoader;
