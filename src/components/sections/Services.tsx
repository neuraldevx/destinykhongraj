"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";
import SplitText from "split-type";

//Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingsRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const splitHeadingsRef = useRef<SplitText[]>([]);

  useGSAP(() => {
    const sections = sectionsRef.current;
    const headings = headingsRef.current;

    //Initialize SplitText for headings
    splitHeadingsRef.current = headings.map(heading => 
      heading ? new SplitText(heading, { 
        type: "chars,words,lines"
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
    <section ref={containerRef} className="services-container py-16 lg:py-24">
      <style jsx>{`
        .services-container {
          background: #0a0a0a;
          color: white;
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
        }
      `}</style>
      
      {/* Section Header */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
          What We
          <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Create Together
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Where vision meets execution in perfect harmony
        </p>
      </div>

      {services.map((service, index) => (
        <div
          key={index}
          ref={(el) => (sectionsRef.current[index] = el)}
          className="service-section"
        >
          <div
            className="bg"
            style={{
              backgroundImage: `url(${service.imageUrl})`
            }}
          />
          <h2
            ref={(el) => (headingsRef.current[index] = el)}
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