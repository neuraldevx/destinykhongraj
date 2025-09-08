"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Use global Gambarino font from globals.css

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Set initial time and update every minute
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    };
    
    updateTime(); // Set initial time
    const interval = setInterval(updateTime, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (!footerRef.current) return;

    const title = footerRef.current.querySelector(".footer-title");
    const button = footerRef.current.querySelector(".footer-button");
    const socialLinks = gsap.utils.toArray(".social-link") as HTMLElement[];
    const locationTime = gsap.utils.toArray(".location-time") as HTMLElement[];
    const backgroundPattern = footerRef.current.querySelector(".background-pattern");

    //Background pattern animation
    if (backgroundPattern) {
      gsap.fromTo(backgroundPattern, {
        scale: 0.8,
        rotation: -180,
        opacity: 0,
      }, {
        scale: 1,
        rotation: 0,
        opacity: 0.1,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: backgroundPattern,
          start: "top 90%",
        }
      });
    }

    //Main title animation with sophisticated entrance
    if (title) {
      gsap.fromTo(title, {
        y: 120,
        opacity: 0,
        scale: 0.8,
        rotationX: -90,
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
        }
      });
    }

    //Button animation with hover effects
    if (button) {
      gsap.fromTo(button, {
        y: 80,
        opacity: 0,
        scale: 0.7,
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: button,
          start: "top 85%",
        },
        delay: 0.4,
      });

      //Button hover animation
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          y: -5,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    }

    //Enhanced social links animation
    socialLinks.forEach((link, index) => {
      gsap.fromTo(link, {
        y: 50,
        opacity: 0,
        rotationY: -90,
      }, {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: link,
          start: "top 90%",
        },
        delay: index * 0.15 + 0.8,
      });

      //Link hover effects
      link.addEventListener('mouseenter', () => {
        gsap.to(link, {
          scale: 1.1,
          color: "#A7292F",
          duration: 0.3,
          ease: "power2.out"
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.to(link, {
          scale: 1,
          color: "#4B5563",
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    //Location and time with typewriter effect
    locationTime.forEach((item, index) => {
      gsap.fromTo(item, {
        y: 30,
        opacity: 0,
        scaleX: 0,
      }, {
        y: 0,
        opacity: 1,
        scaleX: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 95%",
        },
        delay: index * 0.3,
      });
    });

  }, { scope: footerRef });

  return (
    <section ref={footerRef} id="footer" className="relative bg-cream py-16 lg:py-24">
      {/* Background Pattern */}
      <div className="background-pattern absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-[#A68621] rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-[#A68621] rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 border border-[#A68621] rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-20 h-20 border border-[#A68621] rounded-full"></div>
      </div>

      <footer className="relative space-y-16 px-6 lg:px-12">
        {/* Header with location and time */}
        <div className="flex justify-between items-start mb-16 max-w-7xl mx-auto">
          <p className={`location-time font-medium text-lg text-subheading/80`}>
            Los Angeles, CA
          </p>
          <div className={`location-time text-heading font-medium text-lg`}>
            {currentTime}
          </div>
        </div>

        {/* Main content */}
        <div className="text-center py-16 max-w-7xl mx-auto">
          <h2 className={`footer-title text-5xl md:text-7xl font-light text-heading mb-12 leading-tight tracking-tight`}>
            Let&apos;s work{" "}
            <span className="bg-gradient-to-r from-[#A68621] to-[#A7292F] bg-clip-text text-transparent">together!</span>
          </h2>

          <a
            href="mailto:destinykhongraj1@gmail.com"
            aria-label="Email Destiny at destinykhongraj1@gmail.com"
            className={`footer-button inline-block bg-gradient-to-r from-[#A68621] to-[#A7292F] hover:from-[#A7292F] hover:to-[#A68621] text-cream px-10 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-2xl border border-[#A68621]/60`}
          >
            Get in Touch
          </a>
        </div>

        {/* Footer navigation */}
        <div className="grid grid-cols-3 gap-8 text-center md:text-left pt-16 border-t border-[#A68621]/30 max-w-7xl mx-auto">
          <div className="space-y-3">
            <a href="https://www.instagram.com/destinykhongraj/" target="_blank" rel="noopener noreferrer" className={`social-link block font-medium text-subheading/80 hover:text-heading transition-colors text-lg`}>
              Instagram
            </a>
            <a href="#" className={`social-link block font-medium text-subheading/80 hover:text-heading transition-colors text-lg`}>
              YouTube
            </a>
          </div>
          
          <div className="flex justify-center items-center">
            <p className={`font-medium text-heading text-lg`}>©2025</p>
          </div>
          
          <div className="space-y-3 text-right">
            <a href="https://www.linkedin.com/in/destiny-khongraj-5050781a4/" target="_blank" rel="noopener noreferrer" className={`social-link block font-medium text-subheading/80 hover:text-heading transition-colors text-lg`}>
              LinkedIn
            </a>
            <a href="#" className={`social-link block font-medium text-subheading/80 hover:text-heading transition-colors text-lg`}>
              TikTok
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
