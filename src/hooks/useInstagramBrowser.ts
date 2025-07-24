import { useEffect, useState } from "react";

export default function useInstagramBrowser() {
  const [isInstagram, setIsInstagram] = useState(false);

  useEffect(() => {
    if (
      typeof navigator !== "undefined" &&
      navigator.userAgent.includes("Instagram")
    ) {
      setIsInstagram(true);
    }
  }, []);

  return isInstagram;
}