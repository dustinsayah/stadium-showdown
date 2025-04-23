import { useEffect } from "react";

const AdcashLoader = () => {
  useEffect(() => {
    // Load the Adcash script library
    const aclibScript = document.createElement("script");
    aclibScript.src = "//acscdn.com/script/aclib.js";
    aclibScript.async = true;
    aclibScript.id = "aclib";
    document.head.appendChild(aclibScript);

    // Load the Adcash banner after the library is ready
    aclibScript.onload = () => {
      const runScript = document.createElement("script");
      runScript.type = "text/javascript";
      runScript.innerHTML = `
        aclib.runBanner({
          zoneId: '9864210'
        });
      `;
      document.getElementById("adcash-bottom-banner").appendChild(runScript);
    };
  }, []);

  return (
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
  );
};

export default AdcashLoader;
