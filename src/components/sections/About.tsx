"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { playfair_display } from "@/fonts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const aboutSections = [
  {
    title: "About Destiny",
    subtitle: "Creative Storyteller",
    background: "/images/hero/image-1.jpg",
  },
  {
    title: "Passion Driven",
    subtitle: "Authentic Content",
    background: "/images/hero/image-2.jpg",
  },
  {
    title: "Brand Connections",
    subtitle: "Digital Narratives",
    background: "/images/hero/image-3.jpg",
  },
  {
    title: "Meaningful Impact",
    subtitle: "100+ Projects",
    background: "/images/hero/image-4.jpg",
  },
];

export default function About() {
  const aboutRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!aboutRef.current) return;

    const getRatio = (el: HTMLElement) => 
      window.innerHeight / (window.innerHeight + el.offsetHeight);

    const sections = gsap.utils.toArray(".parallax-section") as HTMLElement[];
    
    sections.forEach((section, i) => {
      const bg = section.querySelector(".parallax-bg") as HTMLElement;
      const content = section.querySelector(".parallax-content") as HTMLElement;
      
      if (!bg || !content) return;

      // Parallax background effect
      gsap.fromTo(bg, {
        backgroundPosition: () => 
          i === 0 ? "50% 0px" : `50% ${-window.innerHeight * getRatio(section)}px`
      }, {
        backgroundPosition: () => 
          `50% ${window.innerHeight * (1 - getRatio(section))}px`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: () => i === 0 ? "top top" : "top bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      // Content animations
      const title = content.querySelector(".section-title");
      const subtitle = content.querySelector(".section-subtitle");
      
      if (title) {
        gsap.fromTo(title, {
          y: 100,
          opacity: 0,
          rotationX: -30,
        }, {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.6)",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          }
        });
      }

      if (subtitle) {
        gsap.fromTo(subtitle, {
          y: 50,
          opacity: 0,
          scale: 0.8,
        }, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          }
        });
      }

      // Add floating animation for content
      gsap.to(content, {
        y: -30,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.5,
      });
    });

  }, { scope: aboutRef });

  return (
    <section ref={aboutRef} id="about" className="relative">
      {aboutSections.map((section, index) => (
        <div 
          key={index}
          className="parallax-section relative h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Parallax Background */}
          <div 
            className="parallax-bg absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${section.background})`,
              filter: "brightness(0.3) contrast(1.2)",
            }}
          />
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          
          {/* Content */}
          <div className="parallax-content relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h1 
              className={`section-title text-6xl md:text-8xl lg:text-9xl font-bold text-[#F5F0EC] mb-6 leading-none ${playfair_display.className}`}
              style={{ 
                textShadow: "0 4px 20px rgba(0,0,0,0.7)",
                perspective: "1000px",
              }}
            >
              {section.title}
            </h1>
            
            <p 
              className="section-subtitle text-xl md:text-2xl lg:text-3xl text-[#D6A4A4] font-medium tracking-wide"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
            >
              {section.subtitle}
            </p>
            
            {/* Decorative elements */}
            <div className="mt-8 flex justify-center space-x-4">
              <div className="w-2 h-2 bg-[#D6A4A4] rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-[#F5F0EC] rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="w-2 h-2 bg-[#D6A4A4] rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
          
          {/* Scroll indicator for first section */}
          {index === 0 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#F5F0EC] animate-bounce">
              <div className="w-6 h-10 border-2 border-[#F5F0EC] rounded-full flex justify-center">
                <div className="w-1 h-3 bg-[#F5F0EC] rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}