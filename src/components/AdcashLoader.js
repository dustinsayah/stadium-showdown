import { useEffect } from "react";

const AdcashLoader = () => {
  useEffect(() => {
    // Prevent multiple banners stacking
    if (document.getElementById("aclib")) return;

    const script = document.createElement("script");
    script.id = "aclib";
    script.src = "//acscdn.com/script/aclib.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const bannerContainer = document.getElementById("adcash-banner");
      if (bannerContainer) {
        // Prevent banner reload if already added
        if (!bannerContainer.hasChildNodes()) {
          window.aclib?.runBanner({
            zoneId: "9864282",
          });
        }
      }
    };
  }, []);

  return <div id="adcash-banner" className="adcash-banner"></div>;
};

export default AdcashLoader;
