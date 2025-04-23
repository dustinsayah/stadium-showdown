import { useEffect } from "react";

const AdcashLoader = () => {
  useEffect(() => {
    // Inject the Adcash library script only once
    if (!document.getElementById("aclib")) {
      const aclibScript = document.createElement("script");
      aclibScript.src = "//acscdn.com/script/aclib.js";
      aclibScript.async = true;
      aclibScript.id = "aclib";
      document.head.appendChild(aclibScript);

      aclibScript.onload = runAds;
    } else {
      runAds();
    }

    function runAds() {
      // Standard bottom banner
      const bottomBannerScript = document.createElement("script");
      bottomBannerScript.type = "text/javascript";
      bottomBannerScript.innerHTML = `
        aclib.runBanner({
          zoneId: '9864210'
        });
      `;
      document.getElementById("adcash-bottom-banner").appendChild(bottomBannerScript);

      // In-page push in bottom right
      const inPagePushScript = document.createElement("script");
      inPagePushScript.type = "text/javascript";
      inPagePushScript.innerHTML = `
        aclib.runInPagePush({
          zoneId: '9864242',
          maxAds: 2
        });
      `;
      document.getElementById("adcash-inpage-push").appendChild(inPagePushScript);
    }
  }, []);

  return (
    <>
      <div
        id="adcash-bottom-banner"
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: 9999,
          textAlign: "center",
          background: "#000",
          padding: "10px 0"
        }}
      />
      <div id="adcash-inpage-push" />
    </>
  );
};

export default AdcashLoader;
