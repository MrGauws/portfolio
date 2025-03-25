"use client";

import { useEffect } from "react";
import ReactGA from "react-ga4";

const AnalyticsInitializer = () => {
  useEffect(() => {
    // Initialisera Google Analytics med ditt GA4 Measurement ID
    ReactGA.initialize("G-QWHVZR1GC1");
    // Spåra den första sidvisningen
    ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });

    // Spåra sidvisningar vid navigering
    const handleRouteChange = () => {
      ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return null; // Denna komponent renderar ingenting
};

export default AnalyticsInitializer;