"use client";

import { motion } from "motion/react";
import { inter, playfair_display } from "@/fonts";
import Slider from "@/components/layout/Slider";
import { useEffect, useRef } from "react";

// Slider images sourced from public/images/hero (PNG set provided)
const sliderImages = [
  "/images/hero/image-1.png",
  "/images/hero/image-2.png",
  "/images/hero/image-3.png",
  "/images/hero/image-4.png",
  "/images/hero/image-5.png",
  "/images/hero/image-6.png",
  "/images/hero/image-7.png",
  "/images/hero/image-8.png",
  "/images/hero/image-9.png",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //Dispatch event when hero animation completes
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('heroAnimationComplete'));
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" ref={containerRef} className="pt-4 pb-0 h-screen relative bg-gradient-to-b from-white via-cream to-maroon-50">
      <div className="px-4">
        <h1 className="hidden">Destiny Khongraj</h1>

        <motion.div
          initial={{
            scale: 0.25,
            top: "50%",
            y: "-50%",
          }}
          animate={{
            scale: 1,
            top: "0px",
            y: "16px",
          }}
          transition={{
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
            scale: {
              duration: 1,
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1],
            },
            top: {
              duration: 1.5,
              delay: 1.5,
              ease: [0.22, 1, 0.36, 1],
            },
            y: {
              duration: 1.5,
              delay: 1.5,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="absolute flex flex-col items-center justify-center sm:flex-row sm:gap-8 sm:justify-between left-4 right-4 origin-center will-change-transform"
        >
          <div className="overflow-hidden -mb-3 sm:mb-0">
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full pointer-events-none mb-6"
            >
              <h2
                className={`${inter.className} text-6xl md:text-8xl lg:text-9xl font-extrabold text-maroon-800 cursor-default tracking-tight leading-none`}
              >
                Destiny
              </h2>
            </motion.div>
          </div>

          <div className="overflow-hidden">
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full pointer-events-none mb-6"
            >
              <h2
                className={`${inter.className} text-6xl md:text-8xl lg:text-9xl font-extrabold text-maroon-800 cursor-default tracking-tight leading-none`}
              >
                Khongraj
              </h2>
            </motion.div>
          </div>
        </motion.div>

        <div className="overflow-hidden absolute left-4 right-4 xs:top-[80vh] sm:top-[70vh] md:top-[12.5vw] top-[72vh]">
          <div className="flex flex-col gap-0.5 md:gap-0 md:flex-row justify-between items-center relative">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.5,
                  delay: 1.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`${inter.className} text-[clamp(18px,1.4vw,28px)] font-medium leading-[1.2] text-center md:text-left text-maroon-700`}
              >
                Visual Architect & Digital Dreamer
              </motion.p>
            </div>

            <div className="hidden md:block overflow-hidden absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <motion.div
                initial={{ y: 120, rotate: 0 }}
                animate={{ y: 0, rotate: 360 }}
                transition={{
                  duration: 1.5,
                  delay: 1.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-[clamp(28px,2vw,48px)] h-[clamp(28px,2vw,48px)] relative group"
              >
                <div className="w-full h-full bg-transparent flex items-center justify-center">
                  <img 
                    src="/images/icons/camera.svg" 
                    alt="Camera icon"
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.5,
                  delay: 1.95,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`${playfair_display.className} text-[clamp(18px,1.4vw,28px)] font-normal -mt-1 leading-[1.2] text-center md:text-left text-gray-700`}
              >
                Crafting stories that resonate across universes
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[19vh] xs:mt-[23vh] sm:mt-[12vh] md:mt-[14vw]">
        <Slider images={sliderImages} />
      </div>
    </section>
  );
}
