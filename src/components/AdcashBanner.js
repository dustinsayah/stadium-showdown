// src/components/AdcashBanner.js
import { useEffect } from "react";

const AdcashBanner = () => {
  useEffect(() => {
    // Load Adcash Library
    const libScript = document.createElement("script");
    libScript.src = "//acscdn.com/script/aclib.js";
    libScript.type = "text/javascript";
    libScript.async = true;
    libScript.id = "aclib";
    document.head.appendChild(libScript);

    // Load Adcash Banner
    const tagScript = document.createElement("script");
    tagScript.type = "text/javascript";
    tagScript.innerHTML = `
      aclib.runBanner({
        zoneId: '9864098',
      });
    `;
    document.getElementById("adcash-banner-container")?.appendChild(tagScript);
  }, []);

  return <div id="adcash-banner-container" style={{ marginTop: "50px" }}></div>;
};

export default AdcashBanner;
