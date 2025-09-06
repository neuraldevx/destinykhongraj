"use client";

import { useEffect } from "react";

const titles = [
  "Destiny Khongraj",
  "hi!!!",
  "content creator",
  "digital storyteller",
];

const awayTitle = "wait, come back 😔😕";

export default function DocumentTitleChanger() {
  useEffect(() => {
    let index = 0;
    let intervalId: number | undefined;

    const startCycling = () => {
      // Set immediately, then cycle
      document.title = titles[index];
      intervalId = window.setInterval(() => {
        index = (index + 1) % titles.length;
        document.title = titles[index];
      }, 3000);
    };

    const stopCycling = () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stopCycling();
        document.title = awayTitle;
      } else {
        // Resume cycling from current index
        stopCycling();
        startCycling();
      }
    };

    // Initialize based on current visibility
    if (typeof document !== "undefined" && document.hidden) {
      document.title = awayTitle;
    } else {
      startCycling();
    }

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      stopCycling();
    };
  }, []);

  return null;
}
