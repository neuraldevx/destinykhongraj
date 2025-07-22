"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useWindowSize from "@/hooks/useWindowSize";

// Register GSAP plugins
gsap.registerPlugin(useGSAP);

type SliderProps = {
  images: string[];
};

export default function Slider({ images }: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  // Simplified GSAP animation without Observer dependency
  useGSAP(() => {
    if (!sliderRef.current) return;

    const content = sliderRef.current;
    let xPos = 0;
    
    // Set up automatic scrolling animation
    const tick = () => {
      xPos -= 1; // Scroll speed
      gsap.set(content, { x: xPos });
      
      // Reset position when scrolled too far
      if (Math.abs(xPos) >= content.scrollWidth / 2) {
        xPos = 0;
      }
    };

    // Add ticker for smooth animation
    gsap.ticker.add(tick);

    // Clean up on component unmount
    return () => {
      gsap.ticker.remove(tick);
    };
  }, []);

  // Create a duplicate array of images to allow for the infinite loop effect
  const allImages = [...images, ...images];

  return (
    <div className="overflow-x-hidden py-12">
      {/* Slider container with auto-scrolling GSAP animation */}
      <div
        ref={sliderRef}
        className="w-max whitespace-nowrap flex gap-[clamp(8px,1vw,16px)] pr-[clamp(8px,1vw,16px)]"
      >
        {allImages.map((imageUrl, index) => (
          <motion.div
            key={index}
            // Initial state: slightly below and transparent
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            // Final state: in position, fully visible
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              duration: 2.5,
              // Delay entrance animation based on screen size
              delay: width < 768 ? 2 : 2.4,
              // Custom easing for smooth animation
              ease: [0.22, 1, 0.36, 1],
            }}
            className="slider-card p-3 rounded-xl bg-maroon-700"
          >
            <div 
              className="w-[clamp(260px,20vw,400px)] h-[clamp(320px,25vw,450px)] rounded-lg overflow-hidden relative select-none flex items-center justify-center"
              style={{
                // Dynamic gradient background based on card index
                background: `linear-gradient(135deg, ${
                  index % 6 === 0 ? '#991b1b, #7f1d1d' :  // Maroon gradient
                  index % 6 === 1 ? '#6b7280, #4b5563' :  // Grey gradient
                  index % 6 === 2 ? '#991b1b, #6b7280' :  // Maroon to grey
                  index % 6 === 3 ? '#7f1d1d, #4b5563' :  // Dark maroon to grey
                  index % 6 === 4 ? '#6b7280, #991b1b' :  // Grey to maroon
                  '#4b5563, #7f1d1d'                      // Dark grey to dark maroon
                })`
              }}
            >
              {/* Placeholder content text */}
              <div className="text-white font-bold text-xl font-inter">
                Content {(index % images.length) + 1}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}