// src/components/AdcashLoader.js
import { useEffect } from "react";

const AdcashLoader = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://acscdn.com/script/aclib.js"; // ✅ Load Adcash SDK
    script.async = true;
    script.onload = () => {
      if (window.aclib) {
        window.aclib.runAutoTag({ zoneId: "vjptft0ohw" });
      }
    };
    document.body.appendChild(script);
  }, []);

  return null; // This component doesn't render anything
};

export default AdcashLoader;
