import { useEffect } from "react";

const AdcashLoader = () => {
  useEffect(() => {
    if (document.getElementById("aclib-script")) return; // ⛔ prevent duplicates

    const script = document.createElement("script");
    script.id = "aclib-script";
    script.type = "text/javascript";
    script.src = "//acscdn.com/script/aclib.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // ✅ Clear previous banner
      const existingBanner = document.getElementById("adcash-banner");
      if (existingBanner) existingBanner.remove();

      const wrapper = document.createElement("div");
      wrapper.id = "adcash-banner";
      wrapper.style.position = "fixed";
      wrapper.style.bottom = "0";
      wrapper.style.left = "0";
      wrapper.style.width = "100%";
      wrapper.style.zIndex = "9999";

      const bannerScript = document.createElement("script");
      bannerScript.type = "text/javascript";
      bannerScript.innerHTML = `
        aclib.runBanner({
          zoneId: '9864282',
        });
      `;

      wrapper.appendChild(bannerScript);
      document.body.appendChild(wrapper);
    };
  }, []);

  return null;
};

export default AdcashLoader;
