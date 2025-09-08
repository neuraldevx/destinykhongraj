"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../components/sections/Hero";
import AboutHorizontal from "../components/sections/AboutHorizontal";
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
          start: "top 80%",
          end: "top 70%",
          scrub: 1,
        }
      });
    });

    // Extra safe refresh points for dynamic content/imagery
    const onLoad = () => { try { ScrollTrigger.refresh(true); } catch { /* noop */ } };
    const rAF = requestAnimationFrame(() => { try { ScrollTrigger.refresh(true); } catch { /* noop */ } });
    const t = setTimeout(() => { try { ScrollTrigger.refresh(true); } catch { /* noop */ } }, 800);
    window.addEventListener('load', onLoad, { once: true });

    // Cleanup
    return () => {
      window.removeEventListener('heroAnimationComplete', handleHeroComplete);
      window.removeEventListener('load', onLoad);
      cancelAnimationFrame(rAF);
      clearTimeout(t);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <AboutHorizontal />
      <Services />
      <Projects />
      <Footer />
    </main>
  );
}
