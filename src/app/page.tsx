"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import Projects from "../components/sections/Projects";
import Footer from "../components/sections/Footer";

gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  useEffect(() => {
    // Enable smooth scrolling after hero animation completes
    const handleHeroComplete = () => {
      // Refresh ScrollTrigger when hero animation is complete
      ScrollTrigger.refresh();
    };

    window.addEventListener('heroAnimationComplete', handleHeroComplete);

    // Create smooth scroll transitions between sections
    const sections = gsap.utils.toArray<HTMLElement>("section");

    sections.forEach((section, index) => {
      if (index === 0) return; // Skip hero section
      
      // Fade in sections as they come into view
      gsap.fromTo(section, {
        opacity: 0.8,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        }
      });
    });

    // Cleanup
    return () => {
      window.removeEventListener('heroAnimationComplete', handleHeroComplete);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <About />
      <Services />
      <Projects />
      <Footer />
    </main>
  );
}
