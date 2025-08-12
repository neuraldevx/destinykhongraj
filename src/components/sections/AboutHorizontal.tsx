"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Panel data type
interface PanelData {
  id: string;
  title: string;
  content: string[];
  imageUrl?: string;
}

// Panel data
const panelData: PanelData[] = [
  {
    id: "about-me",
    title: "About Me",
    content: [
      "Visual architect and digital dreamer crafting stories that resonate across universes.",
      "With a passion for creating immersive experiences, I blend creativity with technical expertise to bring ideas to life.",
      "Every project is an opportunity to push boundaries and explore new possibilities in digital storytelling."
    ],
    imageUrl: "/images/hero/image-1.jpg" // Placeholder image
  },
  {
    id: "skills",
    title: "Skills",
    content: [
      "Frontend Development: React, Next.js, TypeScript, Tailwind CSS",
      "Animation Libraries: GSAP, Framer Motion, Lenis",
      "Design Tools: Figma, Adobe Creative Suite",
      "Backend: Node.js, Express, MongoDB",
      "Other: Git, Docker, AWS, Vercel"
    ],
    imageUrl: "/images/hero/image-2.jpg" // Placeholder image
  },
  {
    id: "experience",
    title: "Experience",
    content: [
      "5+ years of experience in digital product design and development",
      "Led multiple high-impact projects from concept to deployment",
      "Collaborated with cross-functional teams to deliver exceptional user experiences",
      "Specialized in performance optimization and accessibility standards"
    ],
    imageUrl: "/images/hero/image-3.jpg" // Placeholder image
  },
  {
    id: "hobbies",
    title: "Hobbies",
    content: [
      "Photography: Capturing moments and exploring visual storytelling",
      "Travel: Discovering new cultures and perspectives around the world",
      "Reading: Science fiction and design philosophy books",
      "Cooking: Experimenting with flavors from different cuisines",
      "Gaming: Appreciating interactive design and narrative experiences"
    ],
    imageUrl: "/images/hero/image-4.jpg" // Placeholder image
  }
];

export default function AboutHorizontal() {
  const containerRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || !containerRef.current || !wrapperRef.current) {
      return;
    }

    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const panels = panelRefs.current.filter(Boolean);

    // Create GSAP context for proper scoping and cleanup
    const ctx = gsap.context(() => {
      // Only apply horizontal scroll on medium screens and up
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Calculate total width to scroll
        const totalWidth = panels.length * window.innerWidth;
        const scrollDistance = totalWidth - window.innerWidth;

        // Set up horizontal scroll animation
        const scrollTween = gsap.to(wrapper, {
          x: -scrollDistance,
          ease: "none"
        });

        // Create ScrollTrigger for horizontal scroll
        // Allow normal scrolling first, then start horizontal scroll
        ScrollTrigger.create({
          trigger: container,
          start: "top center", // Start when section reaches center of viewport
          end: `+=${scrollDistance + window.innerHeight}`, // Add extra scroll distance
          scrub: true,
          pin: true,
          animation: scrollTween,
          invalidateOnRefresh: true,
          onEnter: () => {
            // Ensure component is fully visible before starting horizontal scroll
            ScrollTrigger.refresh();
          }
        });

        // Add panel reveal animations
        panels.forEach((panel) => {
          if (panel) {
            // Set initial state
            gsap.set(panel, { opacity: 0.8, scale: 0.95 });

            // Create reveal animation for each panel
            ScrollTrigger.create({
              trigger: panel,
              start: "left 75%",
              end: "right 25%",
              scrub: true,
              animation: gsap.to(panel, {
                opacity: 1,
                scale: 1,
                ease: "none"
              }),
              invalidateOnRefresh: true
            });
          }
        });
      });

    }, container);

    // Cleanup function
    return () => {
      ctx.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      aria-labelledby="about-title"
      className="relative bg-charcoal overflow-hidden"
    >
      <h2 id="about-title" className="sr-only">About Destiny Khongraj</h2>
      
      <div 
        ref={wrapperRef}
        className="flex flex-col md:flex-row"
      >
        {panelData.map((panel, index) => (
          <div
            key={panel.id}
            ref={(el) => { panelRefs.current[index] = el; }}
            className="w-full md:w-screen md:h-screen flex-shrink-0 flex items-center justify-center p-8 md:p-16"
            style={{
              backgroundColor: index % 2 === 0 ? '#1a202c' : '#2d3748'
            }}
          >
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image Section */}
              <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
                  {panel.imageUrl ? (
                    <Image
                      src={panel.imageUrl}
                      alt={`${panel.title} illustration`}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-stone/20 flex items-center justify-center">
                      <div className="text-center text-stone">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone/20 flex items-center justify-center">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium">Image placeholder for {panel.title}</p>
                        <p className="text-xs opacity-70 mt-1">Replace with custom image</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              {/* Content Section */}
              <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <h3 className="text-4xl md:text-6xl font-bold text-pearl mb-8">
                  {panel.title}
                </h3>
                <div className="space-y-4">
                  {panel.content.map((paragraph, pIndex) => (
                    <p 
                      key={pIndex}
                      className="text-lg md:text-xl text-silver leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile scroll indicator */}
      <div className="md:hidden fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-2">
          {panelData.map((_, index) => (
            <div 
              key={index}
              className="w-2 h-2 bg-stone rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}