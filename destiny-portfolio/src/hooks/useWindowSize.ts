import { useState, useEffect } from "react";

/**
 * Custom hook to track window dimensions
 * Handles SSR compatibility and provides real-time window size updates
 * 
 * @returns {Object} Object containing current window width and height
 * @returns {number} returns.width - Current window width in pixels
 * @returns {number} returns.height - Current window height in pixels
 */
export default function useWindowSize() {
  // Initialize window size state, handling SSR by checking window existence
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // This effect only runs on the client side after component mount
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size once component is mounted
    handleResize();

    // Add event listener for window resize events
    window.addEventListener("resize", handleResize);
    
    // Cleanup: remove event listener when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array means this effect runs once on mount

  return windowSize;
}