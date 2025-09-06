"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";
import SplitText from "split-type";
import { inter, playfair_display } from "@/fonts";

//Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingsRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const splitHeadingsRef = useRef<SplitText[]>([]);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const subHeaderRef = useRef<HTMLParagraphElement>(null);

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
      gsap.set(backgroundEl, { scale: 1.2 });

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

      //Background parallax effect
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

  }, { scope: containerRef });

  return (
    <section id="services" ref={containerRef} className="services-container py-16 lg:py-24">
      <style jsx>{`
        .services-container {
          background: #FDFBF7;
          color: #1F2937;
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
          background-attachment: fixed;
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
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0.7) 100%
          );
        }
        .service-section h2 {
          position: relative;
          z-index: 10;
          font-size: clamp(3rem, 12vw, 8rem);
          font-weight: 700;
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
      `}</style>
      
      {/* Section Header */}
      <div className="text-center mb-16 px-4">
        <h2 
          ref={headerRef}
          className={`${inter.className} text-5xl lg:text-7xl font-light text-maroon-800 mb-4 tracking-tight overflow-hidden`}
        >
          What We{" "}
          <span className="block bg-gradient-to-r from-maroon-600 via-maroon-500 to-maroon-600 bg-clip-text text-black">
            Create Together
          </span>
        </h2>
        <p 
          ref={subHeaderRef}
          className={`${playfair_display.className} text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed overflow-hidden`}
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
              backgroundImage: `url(${service.imageUrl})`
            }}
          />
          <h2
            ref={(el) => { headingsRef.current[index] = el; }}
            className="service-title"
          >
            {service.title}
          </h2>
          <div className="service-description">
            <p>{service.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
