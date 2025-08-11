"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import SplitType from "split-type";
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


    // Create master timeline with controlled sequencing
    const masterTL = gsap.timeline({
      onComplete: () => {
        // Enable scroll after animation completes
        document.body.style.overflow = 'auto';
        // Dispatch custom event to signal animation completion
        window.dispatchEvent(new CustomEvent('heroAnimationComplete'));
      }
    });

    // Disable scroll during animation
    document.body.style.overflow = 'hidden';

    // Phase 1: Character flip-in for "DESTINY"
    masterTL.to(destinyChars, {
      rotationY: 0,
      opacity: 1,
      duration: 0.6,
      stagger: {
        amount: 0.4,
        from: "start",
        ease: "power2.out",
      },
      ease: "back.out(1.2)",
      delay: 0.5,
    })

    // Phase 2: Flip animation for "KHONGRAJ" 
    .to(khongrajChars, {
      rotationX: 0,
      z: 0,
      opacity: 1,
      duration: 0.6,
      stagger: {
        amount: 0.4,
        from: "start",
        ease: "power2.out",
      },
      ease: "back.out(1.2)",
    }, "-=0.2")

    // Phase 3: Container scaling - smoother transition
    .to(titleContainerRef.current, {
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.3")

    // Phase 4: Container positioning - controlled movement
    .to(titleContainerRef.current, {
      top: "0px",
      y: "16px",
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.4")

    // Phase 5: Tagline words - clean entrance
    .to(taglineWords, {
      y: 0,
      rotationX: 0,
      opacity: 1,
      duration: 0.5,
      stagger: {
        amount: 0.2,
        ease: "power2.out",
      },
      ease: "power2.out",
    }, "-=0.3")

    // Phase 6: Description - final reveal
    .to(descriptionWords, {
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 0.5,
      stagger: {
        amount: 0.2,
        from: "start",
        ease: "power2.out",
      },
      ease: "power2.out",
    }, "-=0.2");

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
    <section ref={heroRef} className="pt-4 lg:pb-24 h-screen relative bg-gradient-to-br from-midnight via-rose to-midnight">
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
                className="text-6xl md:text-8xl lg:text-9xl font-bold text-mist cursor-default"
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
                className="text-6xl md:text-8xl lg:text-9xl font-bold text-mist cursor-default"
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
                className="text-[clamp(18px,1.4vw,28px)] font-semibold leading-[1.2] text-center md:text-left text-coral"
                style={{ perspective: "800px" }}
              >
                Visual Architect & Digital Dreamer
              </p>
            </div>


            <div className="overflow-visible">
              <p
                ref={descriptionRef}
                className={`${playfair_display.className} text-[clamp(18px,1.4vw,28px)] font-normal -mt-1 leading-[1.2] text-center md:text-left text-rose`}
              >
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