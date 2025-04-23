import React, { useEffect } from "react";

const AdsterraBanner = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//pl24606884.profitablefreetrafficme.com/bab56a92e6ea3afec3f401755f2b68a9/invoke.js";
    script.async = true;
    script.dataset.cfasync = "false";
    document.getElementById("adsterra-container").appendChild(script);
  }, []);

  return <div id="adsterra-container"></div>;
};

export default AdsterraBanner;
