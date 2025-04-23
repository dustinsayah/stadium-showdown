import { useEffect } from "react";

const AdcashLoader = () => {
  useEffect(() => {
    // Inject Adcash library script
    const aclibScript = document.createElement("script");
    aclibScript.src = "//acscdn.com/script/aclib.js";
    aclibScript.async = true;
    aclibScript.id = "aclib";
    document.head.appendChild(aclibScript);

    // Inject Adcash zone script after library loads
    const runScript = document.createElement("script");
    runScript.innerHTML = `
      aclib.runBanner({
        zoneId: '9864098'
      });
    `;
    runScript.type = "text/javascript";

    aclibScript.onload = () => {
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
