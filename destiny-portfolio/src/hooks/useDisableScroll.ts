import { useEffect } from "react";

/**
 * Custom hook to temporarily disable page scrolling
 * Useful for hero animations or modal overlays
 * Automatically re-enables scrolling after 3 seconds
 */
export default function useDisableScroll() {
  useEffect(() => {
    // Check if we're in a browser environment (necessary for Next.js SSR)
    if (typeof window === "undefined") {
      return;
    }

    // Save the original style values to restore them later
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    const originalPosition = document.body.style.position;

    // Apply strong scroll lock by fixing the body position
    document.body.style.overflow = "hidden";      // Hide scrollbars
    document.body.style.height = "100vh";         // Full viewport height
    document.body.style.position = "fixed";       // Prevent scrolling
    document.body.style.width = "100%";           // Maintain full width

    // Set up timeout to re-enable scrolling after animation completes (3 seconds)
    const timer = setTimeout(() => {
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
      document.body.style.position = originalPosition;
      document.body.style.width = "";
    }, 3000); // 3000ms = 3 seconds

    // Cleanup function runs when component unmounts or dependencies change
    return () => {
      clearTimeout(timer);
      // Restore original styles immediately if component unmounts
      document.body.style.overflow = originalOverflow;
      document.body.style.height = originalHeight;
      document.body.style.position = originalPosition;
      document.body.style.width = "";
    };
  }, []); // Empty dependency array means this effect runs once on mount
}