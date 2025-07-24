"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import SplitType from "split-type";
import Image from "next/image";
import { playfair_display } from "@/fonts";
import Slider from "@/components/layout/Slider";
import useWindowSize from "@/hooks/useWindowSize";
import useDisableScroll from "@/hooks/useDisableScroll";

gsap.registerPlugin(useGSAP, Flip);

const sliderImages = [
  "/images/hero/image-1.jpg",
  "/images/hero/image-2.jpg",
  "/images/hero/image-3.jpg",
  "/images/hero/image-4.jpg",
  "/images/hero/image-5.jpg",
  "/images/hero/image-6.jpg",
  "/images/hero/image-7.jpg",
  "/images/hero/image-8.jpg",
  "/images/hero/image-9.jpg",
  "/images/hero/image-10.jpg",
];

export default function Hero() {
  useDisableScroll();
  const { width } = useWindowSize();
  
  const heroRef = useRef<HTMLElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const destinyRef = useRef<HTMLHeadingElement>(null);
  const khongrajRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const starRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current || !titleContainerRef.current) return;

    // Set initial scale based on screen size
    const initialScale = width === 0 || width < 768 ? 0.4 : 0.25;
    
    // Set initial container states
    gsap.set(titleContainerRef.current, {
      scale: initialScale,
      y: "-50%",
      top: "50%",
    });

    // Character-level splitting for flip animations
    let destinyChars: HTMLElement[] = [];
    let khongrajChars: HTMLElement[] = [];
    let taglineWords: HTMLElement[] = [];
    let descriptionWords: HTMLElement[] = [];

    if (destinyRef.current) {
      const destinySplit = new SplitType(destinyRef.current, { types: "chars" });
      destinyChars = destinySplit.chars || [];
      
      // Set up 3D flip effect - characters start rotated back
      gsap.set(destinyChars, {
        rotationY: -90,
        transformOrigin: "50% 50% -50px",
        opacity: 0,
      });
    }

    if (khongrajRef.current) {
      const khongrajSplit = new SplitType(khongrajRef.current, { types: "chars" });
      khongrajChars = khongrajSplit.chars || [];
      
      // Different flip direction for variety
      gsap.set(khongrajChars, {
        rotationX: 90,
        transformOrigin: "50% 50% -50px",
        opacity: 0,
        z: -100,
      });
    }

    if (taglineRef.current) {
      const taglineSplit = new SplitType(taglineRef.current, { types: "words" });
      taglineWords = taglineSplit.words || [];
      
      // Slide and fade effect with perspective
      gsap.set(taglineWords, {
        y: 60,
        rotationX: 45,
        opacity: 0,
        transformOrigin: "50% 100%",
      });
    }

    if (descriptionRef.current) {
      const descriptionSplit = new SplitType(descriptionRef.current, { types: "words" });
      descriptionWords = descriptionSplit.words || [];
      
      // Elastic bounce effect
      gsap.set(descriptionWords, {
        scale: 0,
        rotation: 45,
        opacity: 0,
        transformOrigin: "center",
      });
    }

    if (starRef.current) {
      gsap.set(starRef.current, {
        scale: 0,
        rotation: 180,
        opacity: 0,
      });
    }

    // Create master timeline with spectacular effects
    const masterTL = gsap.timeline();

    // Phase 1: Flashy character flip-in for "DESTINY"
    masterTL.to(destinyChars, {
      rotationY: 0,
      opacity: 1,
      duration: 0.8,
      stagger: {
        amount: 0.6,
        from: "random",
        ease: "back.out(2)",
      },
      ease: "back.out(1.4)",
      delay: 0.3,
    })

    // Phase 2: Different flip animation for "KHONGRAJ" 
    .to(khongrajChars, {
      rotationX: 0,
      z: 0,
      opacity: 1,
      duration: 0.9,
      stagger: {
        amount: 0.8,
        from: "end",
        ease: "power2.out",
      },
      ease: "elastic.out(1, 0.6)",
    }, "-=0.4")

    // Phase 3: Container scaling with elastic bounce
    .to(titleContainerRef.current, {
      scale: 1,
      duration: 1.4,
      ease: "elastic.out(1.2, 0.4)",
    }, "-=0.5")

    // Phase 4: Container positioning with overshoot
    .to(titleContainerRef.current, {
      top: "0px",
      y: "16px",
      duration: 1.2,
      ease: "back.out(1.7)",
    }, "-=0.7")

    // Phase 5: Tagline words with perspective flip
    .to(taglineWords, {
      y: 0,
      rotationX: 0,
      opacity: 1,
      duration: 0.8,
      stagger: {
        amount: 0.4,
        ease: "power2.out",
      },
      ease: "back.out(2)",
    }, "-=0.8")

    // Phase 6: Star with spin and scale
    .to(starRef.current, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
    }, "-=0.6")

    // Phase 7: Description with elastic bounce
    .to(descriptionWords, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.7,
      stagger: {
        amount: 0.5,
        from: "center",
        ease: "back.out(1.7)",
      },
      ease: "elastic.out(1, 0.8)",
    }, "-=0.7");

    // Add hover effects for interactivity
    const addHoverEffects = () => {
      if (destinyChars.length > 0) {
        destinyChars.forEach((char) => {
          char.addEventListener('mouseenter', () => {
            gsap.to(char, {
              scale: 1.2,
              rotationY: 360,
              duration: 0.6,
              ease: "back.out(2)",
            });
          });
          
          char.addEventListener('mouseleave', () => {
            gsap.to(char, {
              scale: 1,
              rotationY: 0,
              duration: 0.4,
              ease: "power2.out",
            });
          });
        });
      }

      if (khongrajChars.length > 0) {
        khongrajChars.forEach((char) => {
          char.addEventListener('mouseenter', () => {
            gsap.to(char, {
              scale: 1.15,
              rotationX: 360,
              duration: 0.5,
              ease: "back.out(1.7)",
            });
          });
          
          char.addEventListener('mouseleave', () => {
            gsap.to(char, {
              scale: 1,
              rotationX: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        });
      }
    };

    // Delay hover effects until animation completes
    gsap.delayedCall(3, addHoverEffects);

  }, { scope: heroRef, dependencies: [width] });

  return (
    <section ref={heroRef} className="pt-4 lg:pb-24 h-screen relative">
      <div className="px-4">
        <h1 className="hidden">Destiny Khongraj</h1>

        <div
          ref={titleContainerRef}
          className="absolute flex flex-col items-center justify-center sm:flex-row sm:gap-8 sm:justify-between left-4 right-4 origin-center will-change-transform"
        >
          <div className="overflow-hidden -mb-3 sm:mb-0">
            <div className="w-full pointer-events-none mb-6">
              <h2 
                ref={destinyRef}
                className="text-6xl md:text-8xl lg:text-9xl font-bold text-[#F5F0EC] cursor-default"
                style={{ perspective: "1000px" }}
              >
                DESTINY
              </h2>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="w-full pointer-events-none mb-6">
              <h2 
                ref={khongrajRef}
                className="text-6xl md:text-8xl lg:text-9xl font-bold text-[#F5F0EC] cursor-default"
                style={{ perspective: "1000px" }}
              >
                KHONGRAJ
              </h2>
            </div>
          </div>
        </div>

        <div className="overflow-hidden absolute left-4 right-4 xs:top-[80vh] sm:top-[70vh] md:top-[12.5vw] top-[72vh]">
          <div className="flex flex-col gap-0.5 md:gap-0 md:flex-row justify-between items-center relative">
            <div className="overflow-visible">
              <p
                ref={taglineRef}
                className="text-[clamp(18px,1.4vw,28px)] font-semibold leading-[1.2] text-center md:text-left text-[#D6A4A4]"
                style={{ perspective: "800px" }}
              >
                Content Creation & Digital Storytelling
              </p>
            </div>

            <div className="hidden md:block overflow-visible absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <div
                ref={starRef}
                className="w-[clamp(28px,2vw,48px)] h-[clamp(28px,2vw,48px)] relative group cursor-pointer"
              >
                <Image
                  src="/images/icons/star.svg"
                  alt="star"
                  fill
                  sizes="(max-width: 768px) 28px, 48px"
                  className="group-hover:rotate-[360deg] transition-transform duration-500 ease-in-out"
                />
              </div>
            </div>

            <div className="overflow-visible">
              <p
                ref={descriptionRef}
                className={`${playfair_display.className} text-[clamp(18px,1.4vw,28px)] font-normal -mt-1 leading-[1.2] text-center md:text-left text-[#BCA5A5]`}
              >
                Scaling brands reach and impact
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