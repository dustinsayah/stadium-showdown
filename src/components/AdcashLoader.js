import { useEffect } from "react";

const AdcashLoader = () => {
  useEffect(() => {
    // Prevent duplicate injection
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
      // Prevent duplicate banner
      if (!document.getElementById("adcash-banner-script")) {
        const bottomBannerScript = document.createElement("script");
        bottomBannerScript.type = "text/javascript";
        bottomBannerScript.id = "adcash-banner-script";
        bottomBannerScript.innerHTML = `
          aclib.runBanner({
            zoneId: '9864210'
          });
        `;
        const bannerContainer = document.getElementById("adcash-bottom-banner");
        if (bannerContainer) {
          bannerContainer.innerHTML = ""; // clear previous
          bannerContainer.appendChild(bottomBannerScript);
        }
      }

      // Prevent duplicate in-page push
      if (!document.getElementById("adcash-push-script")) {
        const inPagePushScript = document.createElement("script");
        inPagePushScript.type = "text/javascript";
        inPagePushScript.id = "adcash-push-script";
        inPagePushScript.innerHTML = `
          aclib.runInPagePush({
            zoneId: '9864242',
            maxAds: 2
          });
        `;
        const pushContainer = document.getElementById("adcash-inpage-push");
        if (pushContainer) {
          pushContainer.innerHTML = ""; // clear previous
          pushContainer.appendChild(inPagePushScript);
        }
      }
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
