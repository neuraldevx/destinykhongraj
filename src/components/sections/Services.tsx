"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";
import ShowcaseModal from "@/components/modal/ShowcaseModal";
import SplitText from "split-type";
// Use global Gambarino font from globals.css for consistent typography

//Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingsRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const splitHeadingsRef = useRef<SplitText[]>([]);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const subHeaderRef = useRef<HTMLParagraphElement>(null);
  const showcaseEnabled = new Set(["PUBLICATIONS", "FASHION STYLING"]);

  // Preload background images so ScrollTrigger can measure correctly, then safe refresh
  useGSAP(() => {
    const urls = services.map(s => s.imageUrl).filter(Boolean) as string[];
    if (!urls.length) return;
    let pending = urls.length;
    const done = () => { if (--pending <= 0) { try { ScrollTrigger.refresh(true); } catch { /* noop */ } } };
    urls.forEach(src => { const img = new Image(); img.onload = done; img.onerror = done; img.src = src; });
  }, { scope: containerRef });

  useGSAP(() => {
    const sections = sectionsRef.current;
    const headings = headingsRef.current;

    // Initialize SplitText for section header
    if (headerRef.current) {
      const headerSplit = new SplitText(headerRef.current, {
        types: "lines,words",
        lineClass: "header-line",
        wordClass: "header-word"
      });

      // Set initial state for header animation
      gsap.set(headerSplit.words, { 
        opacity: 0, 
        y: 100,
        rotationX: -90 
      });

      // Animate header text in
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(headerSplit.words, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            ease: "power3.out",
            stagger: {
              amount: 0.8,
              from: "start"
            }
          });
        }
      });
    }

    // Initialize SplitText for subheader
    if (subHeaderRef.current) {
      const subHeaderSplit = new SplitText(subHeaderRef.current, {
        types: "words",
        wordClass: "subheader-word"
      });

      gsap.set(subHeaderSplit.words, { 
        opacity: 0, 
        y: 30 
      });

      ScrollTrigger.create({
        trigger: subHeaderRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(subHeaderSplit.words, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.3
          });
        }
      });
    }

    //Initialize SplitText for headings
    splitHeadingsRef.current = headings.map(heading => 
      heading ? new SplitText(heading, { 
        types: "chars,words,lines"
      }) : null
    ).filter(Boolean) as SplitText[];

    //Create timeline for each section
    sections.forEach((section, index) => {
      if (!section) return;

      const chars = splitHeadingsRef.current[index]?.chars || [];
      const backgroundEl = section.querySelector('.bg') as HTMLElement;
      
      //Set initial states
      gsap.set(chars, { y: 100, opacity: 0 });
      // Start at 1 to avoid any initial zoom that crops the image
      // Use transform-based parallax (more performant than background-attachment: fixed)
      gsap.set(backgroundEl, { scale: 1.12 });

      //Create timeline for this section
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
          onEnter: () => {
            //Animate text in
            gsap.to(chars, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              stagger: {
                each: 0.02,
                from: "random"
              }
            });
          },
          onLeave: () => {
            //Animate text out
            gsap.to(chars, {
              y: -100,
              opacity: 0,
              duration: 0.5,
              ease: "power2.in",
              stagger: {
                each: 0.01,
                from: "random"
              }
            });
          },
          onEnterBack: () => {
            //Animate text back in
            gsap.to(chars, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              stagger: {
                each: 0.02,
                from: "random"
              }
            });
          },
          onLeaveBack: () => {
            //Animate text back out
            gsap.to(chars, {
              y: 100,
              opacity: 0,
              duration: 0.5,
              ease: "power2.in",
              stagger: {
                each: 0.01,
                from: "random"
              }
            });
          }
      });

      // Background parallax effect via transforms (avoid background-attachment: fixed issues on iOS)
      gsap.to(backgroundEl, {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    // After images/fonts load, safely refresh ScrollTrigger measurements
    const safeRefresh = () => {
      try { ScrollTrigger.refresh(true); } catch { /* ignore */ }
    };
    window.addEventListener('load', safeRefresh, { once: true });

  }, { scope: containerRef });

  return (
    <section id="services" ref={containerRef} className="services-container py-16 lg:py-24">
      <style jsx>{`
        .services-container {
          background: #FFFDEF;
          color: #290102;
        }
        .service-section {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .service-section .bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          /* Avoid background-attachment: fixed for better mobile scroll behavior */
        }
        .service-section .bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.35) 0%,
            rgba(0, 0, 0, 0.12) 50%,
            rgba(0, 0, 0, 0.35) 100%
          );
        }
        .service-section h2 {
          position: relative;
          z-index: 10;
          font-size: clamp(3rem, 12vw, 8rem);
          font-weight: 800;
          text-align: center;
          line-height: 0.9;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: white;
        }
        .service-section .service-description {
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
          max-width: 600px;
          text-align: center;
          font-size: 1.2rem;
          line-height: 1.6;
          z-index: 10;
          color: white;
        }
        .showcase-button {
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 12;
        }
      `}</style>
      
      {/* Section Header */}
      <div className="text-center mb-16 px-4">
        <h2 
          ref={headerRef}
          className={`text-5xl lg:text-7xl font-extrabold text-heading mb-4 tracking-tight`}
        >
          What We{" "}
          <span className="block text-subheading">
            Create Together
          </span>
        </h2>
        <p 
          ref={subHeaderRef}
          className={`text-xl text-subheading/80 max-w-2xl mx-auto leading-relaxed`}
        >
          Where vision meets execution in perfect harmony
        </p>
      </div>

      {services.map((service, index) => (
        <div
          key={index}
          ref={(el) => { sectionsRef.current[index] = el; }}
          className="service-section"
        >
          <div
            className="bg"
            style={{
              backgroundImage: `url(${service.imageUrl})`,
              // Adjust focal point per item via services.ts (service.position)
              backgroundPosition: service.position ?? 'center',
              // Override fit per item via services.ts (service.fit: 'cover' | 'contain')
              backgroundSize: service.fit ?? 'cover',
            }}
          />
          <h2
            ref={(el) => { headingsRef.current[index] = el; }}
            className="service-title"
          >
            {service.title}
          </h2>
          {/* Showcase button (only for Publications & Fashion Styling) */}
          {showcaseEnabled.has(service.title) && (
            <div className="showcase-button">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const r = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                  setTriggerRect(r);
                  setActiveIndex(index);
                }}
                className="rounded-full bg-[#A68621] hover:bg-[#A7292F] text-cream px-6 py-2 text-base md:text-lg border border-white/30 shadow-lg transition-colors"
              >
                Showcase
              </button>
            </div>
          )}
          <div className="service-description">
            <p>{service.description}</p>
          </div>
        </div>
      ))}

      {/* Modal */}
      {activeIndex !== null && (
        <ShowcaseModal
          open={activeIndex !== null}
          title={services[activeIndex].title}
          images={services[activeIndex].gallery ?? []}
          tags={services[activeIndex].keywords}
          sourceRect={triggerRect ?? undefined}
          onClose={() => { setActiveIndex(null); setTriggerRect(null); }}
        />
      )}
    </section>
  );
}
