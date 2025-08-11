"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "split-type";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type CopyProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function Copy({ children, className = "", delay = 0 }: CopyProps) {
  const copyRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!copyRef.current) return;

    const text = copyRef.current;
    
    // Split text into lines
    const splitText = new SplitText(text, { 
      type: "lines",
      linesClass: "copy-line"
    });

    // Set initial state - hidden with mask
    gsap.set(splitText.lines, {
      yPercent: 100,
    });

    // Animate lines into view
    gsap.to(splitText.lines, {
      yPercent: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1,
      delay: delay,
      scrollTrigger: {
        trigger: text,
        start: "top 75%",
        end: "bottom 25%",
      }
    });

    // Cleanup
    return () => {
      if (splitText) splitText.revert();
    };

  }, { scope: copyRef });

  return (
    <div ref={copyRef} className={`copy-container ${className}`}>
      <style jsx>{`
        .copy-container :global(.copy-line) {
          overflow: hidden;
          display: block;
        }
      `}</style>
      {children}
    </div>
  );
}