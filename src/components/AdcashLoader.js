import { useEffect } from "react";

const AdcashLoader = () => {
  useEffect(() => {
    // Prevent re-initialization and duplication
    if (window.aclibLoaded) return;
    window.aclibLoaded = true;

    const script = document.createElement("script");
    script.id = "aclib";
    script.src = "//acscdn.com/script/aclib.js";
    script.async = true;

    script.onload = () => {
      // Disable auto-run ad types (in-page push, pops, etc.)
      window.aclib.autoTagEnabled = false;

      // Render single banner ad
      const container = document.getElementById("adcash-banner");
      if (container && container.childNodes.length === 0) {
        window.aclib.runBanner({
          zoneId: "9864282"
        });
      }
    };

    document.body.appendChild(script);
  }, []);

  return <div id="adcash-banner" className="adcash-banner"></div>;
};

export default AdcashLoader;
