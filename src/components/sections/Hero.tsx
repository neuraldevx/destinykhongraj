"use client";

import { playfair_display } from "@/fonts";
import Slider from "@/components/layout/Slider";

const sliderImages = [
  "/images/hero/image-1.jpg",
  "/images/hero/image-2.jpg",
  "/images/hero/image-3.jpg",
  "/images/hero/image-4.jpg",
  "/images/hero/image-5.jpg",
  "/images/hero/image-6.jpg",
];

export default function Hero() {

  return (
    <section className="pt-4 lg:pb-24 h-screen relative bg-gradient-to-br from-charcoal via-slate to-charcoal">
      <div className="px-4">
        <h1 className="hidden">Destiny Khongraj</h1>

        <div className="absolute flex flex-col items-center justify-center sm:flex-row sm:gap-8 sm:justify-between left-4 right-4 top-4">
          <div className="overflow-hidden -mb-3 sm:mb-0">
            <div className="w-full pointer-events-none mb-6">
              <h2 
                className="text-6xl md:text-8xl lg:text-9xl font-bold text-pearl cursor-default"
                style={{ fontFamily: 'Gambarino-Regular' }}
              >
                DESTINY
              </h2>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="w-full pointer-events-none mb-6">
              <h2 
                className="text-6xl md:text-8xl lg:text-9xl font-bold text-pearl cursor-default"
                style={{ fontFamily: 'Gambarino-Regular' }}
              >
                KHONGRAJ
              </h2>
            </div>
          </div>
        </div>

        <div className="overflow-hidden absolute left-4 right-4 xs:top-[80vh] sm:top-[70vh] md:top-[12.5vw] top-[72vh]">
          <div className="flex flex-col gap-0.5 md:gap-0 md:flex-row justify-between items-center relative">
            <div className="overflow-visible">
              <p className="text-[clamp(18px,1.4vw,28px)] font-semibold leading-[1.2] text-center md:text-left text-accent">
                Visual Architect & Digital Dreamer
              </p>
            </div>

            <div className="overflow-visible">
              <p className={`${playfair_display.className} text-[clamp(18px,1.4vw,28px)] font-normal -mt-1 leading-[1.2] text-center md:text-left text-white`}>
                Crafting stories that resonate across universes
              </p>
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