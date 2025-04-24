import { useEffect } from "react";

const AdcashLoader = () => {
  useEffect(() => {
    if (document.getElementById("aclib-script")) return;

    const script = document.createElement("script");
    script.id = "aclib-script";
    script.src = "//acscdn.com/script/aclib.js";
    script.async = true;
    script.onload = () => {
      if (window.aclib?.runBanner) {
        window.aclib.runBanner({ zoneId: "9864282" });
      }
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div
      id="adcash-banner"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
        textAlign: "center",
      }}
    />
  );
};

export default AdcashLoader;
