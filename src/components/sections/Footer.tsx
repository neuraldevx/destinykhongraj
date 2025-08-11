"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

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

    //Main title animation with text split effect
    if (title) {
      gsap.fromTo(title, {
        y: 100,
        opacity: 0,
        scale: 0.8,
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.8,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
        }
      });
    }

    //Button animation
    if (button) {
      gsap.fromTo(button, {
        y: 50,
        opacity: 0,
        scale: 0.9,
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: button,
          start: "top 85%",
        },
        delay: 0.3,
      });
    }

    //Social links stagger animation
    socialLinks.forEach((link, index) => {
      gsap.fromTo(link, {
        y: 30,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: link,
          start: "top 90%",
        },
        delay: index * 0.1 + 0.5,
      });
    });

    //Location and time animation
    locationTime.forEach((item, index) => {
      gsap.fromTo(item, {
        y: 20,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
        },
        delay: index * 0.2,
      });
    });

  }, { scope: footerRef });

  return (
    <section ref={footerRef} id="footer" className="p-4 bg-gradient-to-t from-midnight via-rose to-mist">
      <footer className="bg-aluminum/20 backdrop-blur-sm rounded-xl p-8 min-h-[600px] flex flex-col justify-between border border-rose/20">
        <div className="flex justify-between items-start">
          <p className="location-time font-semibold text-lg text-mist">
            Los Angeles, CA
          </p>
          <div className="location-time text-coral font-semibold text-lg">
            {currentTime}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="footer-title text-5xl md:text-7xl font-semibold text-mist mb-8 leading-tight">
              Let&apos;s work{" "}
              <span className="text-rose">together!</span>
            </h2>

            <button className="footer-button bg-gradient-to-r from-coral to-rose hover:from-coral/80 hover:to-rose/80 text-midnight px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Get in Touch
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center md:text-left">
          <div className="space-y-2">
            <a href="#" className="social-link block font-semibold text-mist hover:text-coral transition-colors">
              Instagram
            </a>
            <a href="#" className="social-link block font-semibold text-mist hover:text-coral transition-colors">
              YouTube
            </a>
          </div>
          
          <div className="flex justify-center">
            <p className="font-semibold text-rose">©2025</p>
          </div>
          
          <div className="space-y-2 text-right">
            <a href="#" className="social-link block font-semibold text-mist hover:text-coral transition-colors">
              LinkedIn
            </a>
            <a href="#" className="social-link block font-semibold text-mist hover:text-coral transition-colors">
              TikTok
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}