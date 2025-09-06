"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
// Inherit global font (Gambarino) from globals.css for consistent typography

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Panel data type
interface PanelData {
  id: string;
  title: string;
  content: string[];
  imageUrl?: string;
  bullets?: string[];
  summary?: string;
  objectPosition?: string; // CSS object-position for fine-tuned cropping
}

// Panel data
const panelData: PanelData[] = [
  {
    id: "about-me",
    title: "About Me",
    content: [
      "I’ve always believed that great design tells a story, and I love being the one to bring it to life. Whether through editorial layouts, digital campaigns, or product marketing, I’m drawn to the details that make something feel intentional, elevated, and human.",
    ],
    imageUrl: "/images/about/about-1.png",
    objectPosition: "75% 10%", // move focus higher to center face
  },
  {
    id: "experience",
    title: "Experience",
    content: [
      "I’m a multidisciplinary creative with a background in editorial publishing, marketing, and digital brand strategy- specializing in beauty, fashion, and lifestyle. From launching skincare lines and managing TikTok Shop content to designing editorial layouts and leading multi-channel campaigns, I bring strategic thinking and visual storytelling to every project. With experience across print, social, and eCommerce platforms like Shopify and Amazon, I thrive in crafting engaging brand narratives that drive connection, conversion, and growth.",
      "I’m a detail-oriented creative with a background in design, branding, and digital marketing. Over the years, I’ve worked across everything from custom stationery and brand visuals to full e-commerce rollouts, giving me a well-rounded perspective on how to bring ideas to life both online and offline. I love turning big visions into polished, thoughtful experiences.",
    ],
    bullets: [
      "Beauty, fashion, and lifestyle focus",
      "Launched skincare lines and managed TikTok Shop",
      "Designed editorial layouts and led multi-channel campaigns",
      "eCommerce experience across Shopify and Amazon",
      "Brand storytelling that drives connection and growth",
    ],
    summary: "Multidisciplinary creative across editorial, marketing, and digital brand strategy — with eCommerce experience on Shopify and Amazon.",
    imageUrl: "/images/about/about-2.png",
  },
  {
    id: "skills",
    title: "Skills",
    content: [
      "Brand Development & Visual Storytelling",
      "Digital Marketing Strategy",
      "E-commerce",
      "Project Management",
      "Graphic Design & Layout (Adobe Suite, Canva)",
      "Copywriting & Content Creation",
      "Stationery & Print Design",
      "Search Engine Optimization (SEO)",
    ],
    imageUrl: "/images/about/about-3.png",
  },
  {
    id: "hobbies",
    title: "Hobbies",
    content: [
      "I’m a passionate creative artist with a love for painting and bringing ideas to life not only digitally but on paper. I specialize in custom stationery design, creating personalized letterpress pieces. With my stationery business, I get to combine my love for graphic design with true craftsmanship!",
    ],
    imageUrl: "/images/about/about-4.png",
  },
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
        // Distance equals actual scrollable width of wrapper
        const getDistance = () => Math.max(0, (wrapper.scrollWidth || 0) - window.innerWidth);
        let scrollDistance = getDistance();

        // Set up horizontal scroll animation based on real width
        const scrollTween = gsap.to(wrapper, {
          x: () => -getDistance(),
          ease: "none",
        });

        // Create ScrollTrigger for horizontal scroll
        const st = ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: () => `+=${Math.round(getDistance() * 1.8)}`,
          scrub: 1.1,
          pin: true,
          anticipatePin: 1,
          animation: scrollTween,
          snap: {
            snapTo: (value) => {
              const count = Math.max(1, panels.length - 1);
              return Math.round(value * count) / count;
            },
            duration: { min: 0.2, max: 0.6 },
            ease: "power1.out",
          },
          invalidateOnRefresh: true,
        });

        // Recalculate after images/fonts load
        const onLoad = () => {
          scrollDistance = getDistance();
          ScrollTrigger.refresh();
        };
        window.addEventListener('load', onLoad, { once: true });

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
        return () => {
          window.removeEventListener('load', onLoad);
          st.kill();
        };
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
      id="about"
      ref={containerRef}
      aria-labelledby="about-title"
      className="relative bg-white overflow-hidden pt-0 pb-0"
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
            className="w-full md:w-screen md:h-screen flex-shrink-0 flex items-center justify-center p-8 md:p-16 bg-white"
          >
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-start">
              {/* Image Section */}
              <div className="lg:order-1">
                <figure className="relative w-full">
                  <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
                    {panel.id === 'hobbies' ? (
                      <HobbiesSlideshow
                        primary={panel.imageUrl}
                        fallback={`/images/hero/image-${index + 1}.png`}
                      />
                    ) : panel.id === 'skills' ? (
                      <SkillsSlideshow
                        primary={panel.imageUrl}
                        fallback={`/images/hero/image-${index + 1}.png`}
                      />
                    ) : (
                      <PanelImage
                        candidates={buildCandidates(panel.imageUrl, `/images/hero/image-${index + 1}.png`)}
                        alt={`${panel.title} illustration`}
                        position={panel.objectPosition}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                  <figcaption className="text-sm text-gray-500 mt-3">— {panel.title}</figcaption>
                </figure>
              </div>

              {/* Content Section */}
              <div className="lg:order-2">
                <h3 className={`text-5xl md:text-6xl font-semibold text-maroon-800 mb-3 md:mb-4 tracking-tight`}>
                  {panel.title}
                </h3>
                <div aria-hidden className="h-[2px] w-16 bg-gradient-to-r from-maroon-600 to-maroon-300 rounded mb-6 md:mb-8" />
                {panel.id === 'skills' ? (
                  <ul className={`
                    text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed
                    list-disc marker:text-maroon-600 pl-6
                    grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-10
                  `}>
                    {panel.content.map((item, i) => (
                      <li key={i} className="break-inside-avoid">{item}</li>
                    ))}
                  </ul>
                ) : panel.id === 'experience' ? (
                  <div className="space-y-5 max-w-[70ch]">
                    {panel.summary && (
                      <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                        {panel.summary}
                      </p>
                    )}
                    {panel.bullets && (
                      <ul className="list-disc marker:text-maroon-600 pl-6 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-gray-700 text-base sm:text-lg md:text-xl">
                        {panel.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {/* Collapsible details */}
                    <ExperienceDetails paragraphs={panel.content} />
                  </div>
                ) : (
                  <div className="space-y-4 max-w-[65ch]">
                    {panel.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className={`text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
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
              className="w-2 h-2 bg-maroon-400 rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Compact, collapsible details section for Experience slide
function ExperienceDetails({ paragraphs }: { paragraphs: string[] }) {
  const [open, setOpen] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);

  if (!paragraphs || paragraphs.length === 0) return null;

  // Fade/scale overlay in and trap background scroll
  useLayoutEffect(() => {
    const o = overlayRef.current;
    if (open && o) {
      const tl = gsap.timeline();
      tl.fromTo(o, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power1.out" })
        .fromTo(
          o.querySelector('[data-card]') as HTMLElement,
          { y: 8, scale: 0.98, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" },
          0
        );
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const onScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget;
    const bottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
    setAtBottom(bottom);
  };

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    // Always consume wheel events while overlay is open to avoid horizontal slide advancing
    e.stopPropagation();
  };

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    // Always contain touch move while open
    e.stopPropagation();
    const el = e.currentTarget;
    const startY = touchStartY.current;
    if (startY == null) return;
    const dy = startY - e.touches[0].clientY; // down is positive
    // Manually scroll element for consistent behavior on iOS
    el.scrollTop += dy;
    touchStartY.current = e.touches[0].clientY;
  };

  return (
    <div>
      <button
        type="button"
        className="text-maroon-700 hover:text-maroon-800 underline decoration-maroon-300 underline-offset-4 text-base md:text-lg"
        onClick={() => setOpen(true)}
        aria-expanded={open}
      >
        Read full bio
      </button>

      {open && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/30"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            data-card
            className="relative bg-white rounded-xl shadow-xl w-[min(92vw,900px)] max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky header with close button so it never overlays body text */}
            <div className="sticky top-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 border-b border-gray-200/70 px-4 md:px-5 py-2.5 flex justify-end z-10">
              <button
                type="button"
                aria-label="Close"
                className="rounded-full px-3.5 py-1.5 text-maroon-700 border border-maroon-200 hover:bg-maroon-50 text-sm"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <div
              ref={scrollRef}
              onScroll={onScroll}
              onWheel={onWheel}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              className="overflow-y-auto overscroll-contain p-5 md:p-6 pt-4 md:pt-5 pr-3 md:pr-4 space-y-4"
              style={{ WebkitOverflowScrolling: 'touch' as any }}
            >
              {paragraphs.map((p, i) => (
                <p key={i} className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">{p}</p>
              ))}
              {!atBottom && <div aria-hidden className="h-10" />}
            </div>
            {/* Bottom fade hint */}
            {!atBottom && (
              <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}


// Image wrapper with graceful fallback to hero images if /images/about/* is not present yet
function buildCandidates(preferred?: string, fallback?: string): string[] {
  const list: string[] = [];
  const push = (v?: string) => {
    if (v && !list.includes(v)) list.push(v);
  };
  if (preferred) {
    push(preferred);
    const dot = preferred.lastIndexOf(".");
    const base = dot > -1 ? preferred.slice(0, dot) : preferred;
    [".webp", ".jpg", ".jpeg", ".png"].forEach(ext => push(`${base}${ext}`));
  }
  [fallback].forEach(push);
  return list;
}

function PanelImage({ candidates, alt, position }: { candidates: string[]; alt: string; position?: string }) {
  const [index, setIndex] = useState(0);
  const src = candidates[index] || candidates[candidates.length - 1];
  return (
    <Image
      src={src}
      alt={alt}
      fill
      onError={() => setIndex(i => Math.min(i + 1, candidates.length - 1))}
      className="object-cover transition-transform duration-700 hover:scale-105"
      sizes="(max-width: 768px) 100vw, 50vw"
      style={position ? { objectPosition: position } : undefined}
    />
  );
}

// Hobbies slideshow: cycles through images placed in /images/about/hobbies/
function HobbiesSlideshow({ primary, fallback }: { primary?: string; fallback: string }) {
  const holderRef = useRef<HTMLDivElement>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  // Build a set of probable paths and keep only those that successfully load
  useLayoutEffect(() => {
    const baseNames: string[] = [];
    for (let i = 1; i <= 10; i++) baseNames.push(`/images/about/hobbies/hobby-${i}`);
    const exts = ['.webp', '.jpg', '.jpeg', '.png'];
    const candidates: string[] = [];
    baseNames.forEach((b) => exts.forEach((e) => candidates.push(`${b}${e}`)));
    if (primary) candidates.unshift(primary);

    let alive = true;
    const valid: string[] = [];
    let pending = candidates.length;
    if (pending === 0) {
      setSources([fallback]);
      return;
    }
    candidates.forEach((src) => {
      const img = new window.Image();
      img.onload = () => {
        if (alive) valid.push(src);
        if (--pending === 0 && alive) setSources(valid.length ? Array.from(new Set(valid)) : [fallback]);
      };
      img.onerror = () => {
        if (--pending === 0 && alive) setSources(valid.length ? Array.from(new Set(valid)) : [fallback]);
      };
      img.src = src;
    });
    return () => {
      alive = false;
    };
  }, [primary, fallback]);

  // Initialize frames and start autoplay
  useLayoutEffect(() => {
    if (!holderRef.current || sources.length === 0) return;
    const frames = Array.from(holderRef.current.querySelectorAll<HTMLElement>('.hobby-frame'));
    gsap.set(frames, { opacity: 0 });
    gsap.set(frames[0], { opacity: 1 });
    activeRef.current = 0;
    setActive(0);

    const hold = 2800; // ms
    const fade = 800; // ms

    const clear = () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const goTo = (next: number) => {
      if (next === activeRef.current) return;
      const current = frames[activeRef.current];
      const target = frames[next];
      if (!current || !target) return;
      gsap.to(current, { opacity: 0, duration: fade / 1000, ease: 'power2.in' });
      gsap.to(target, { opacity: 1, duration: fade / 1000, ease: 'power2.out' });
      activeRef.current = next;
      setActive(next);
    };

    const start = () => {
      clear();
      timerRef.current = window.setInterval(() => {
        const next = (activeRef.current + 1) % frames.length;
        goTo(next);
      }, hold);
    };

    start();
    return () => clear();
  }, [sources]);

  const manualNav = (dir: number) => {
    const container = holderRef.current;
    if (!container) return;
    const frames = Array.from(container.querySelectorAll<HTMLElement>('.hobby-frame'));
    if (frames.length <= 1) return;
    // Clear and restart autoplay
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const next = (activeRef.current + dir + frames.length) % frames.length;
    const currentEl = frames[activeRef.current];
    const nextEl = frames[next];
    gsap.to(currentEl, { opacity: 0, duration: 0.8, ease: 'power2.in' });
    gsap.to(nextEl, { opacity: 1, duration: 0.8, ease: 'power2.out' });
    activeRef.current = next;
    setActive(next);
    // Restart autoplay after a short delay
    timerRef.current = window.setInterval(() => {
      const nn = (activeRef.current + 1) % frames.length;
      const c = frames[activeRef.current];
      const t = frames[nn];
      gsap.to(c, { opacity: 0, duration: 0.8, ease: 'power2.in' });
      gsap.to(t, { opacity: 1, duration: 0.8, ease: 'power2.out' });
      activeRef.current = nn;
      setActive(nn);
    }, 2800);
  };

  return (
    <div ref={holderRef} className="absolute inset-0">
      {sources.length === 0 ? (
        <Image src={fallback} alt="Hobbies" fill className="object-cover" />
      ) : (
        <>
          {sources.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`Hobby ${i + 1}`}
              fill
              className="hobby-frame object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ))}
          {/* Mini slider controls */}
          {sources.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-2 py-1 rounded-full bg-white/80 shadow-sm">
              <button
                type="button"
                aria-label="Previous"
                className="px-2 py-1 text-maroon-800 hover:text-maroon-900"
                onClick={(e) => { e.stopPropagation(); manualNav(-1); }}
              >
                ‹
              </button>
              <div className="flex items-center gap-1">
                {sources.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to image ${i + 1}`}
                    className={`w-2 h-2 rounded-full ${i === active ? 'bg-maroon-700' : 'bg-gray-400/70'}`}
                    onClick={(e) => { e.stopPropagation(); manualNav(i - activeRef.current); }}
                  />
                ))}
              </div>
              <button
                type="button"
                aria-label="Next"
                className="px-2 py-1 text-maroon-800 hover:text-maroon-900"
                onClick={(e) => { e.stopPropagation(); manualNav(1); }}
              >
                ›
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Skills slideshow mirrors Hobbies but reads from /images/about/skills/skill-1..10
function SkillsSlideshow({ primary, fallback }: { primary?: string; fallback: string }) {
  const holderRef = useRef<HTMLDivElement>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const baseNames: string[] = [];
    for (let i = 1; i <= 10; i++) baseNames.push(`/images/about/skills/skill-${i}`);
    const exts = ['.webp', '.jpg', '.jpeg', '.png'];
    const candidates: string[] = [];
    baseNames.forEach((b) => exts.forEach((e) => candidates.push(`${b}${e}`)));
    if (primary) candidates.unshift(primary);

    let alive = true;
    const valid: string[] = [];
    let pending = candidates.length;
    if (pending === 0) { setSources([fallback]); return; }
    candidates.forEach((src) => {
      const img = new window.Image();
      img.onload = () => { if (alive) valid.push(src); if (--pending === 0 && alive) setSources(valid.length ? Array.from(new Set(valid)) : [fallback]); };
      img.onerror = () => { if (--pending === 0 && alive) setSources(valid.length ? Array.from(new Set(valid)) : [fallback]); };
      img.src = src;
    });
    return () => { alive = false; };
  }, [primary, fallback]);

  useLayoutEffect(() => {
    if (!holderRef.current || sources.length === 0) return;
    const frames = Array.from(holderRef.current.querySelectorAll<HTMLElement>('.skills-frame'));
    gsap.set(frames, { opacity: 0 });
    gsap.set(frames[0], { opacity: 1 });
    activeRef.current = 0; setActive(0);

    const hold = 2800; const fade = 800;
    const clear = () => { if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; } };

    const goTo = (next: number) => {
      if (next === activeRef.current) return;
      const current = frames[activeRef.current]; const target = frames[next]; if (!current || !target) return;
      gsap.to(current, { opacity: 0, duration: fade / 1000, ease: 'power2.in' });
      gsap.to(target, { opacity: 1, duration: fade / 1000, ease: 'power2.out' });
      activeRef.current = next; setActive(next);
    };

    const start = () => {
      clear();
      timerRef.current = window.setInterval(() => { const n = (activeRef.current + 1) % frames.length; goTo(n); }, hold);
    };
    start();
    return () => clear();
  }, [sources]);

  const manualNav = (nextIndex: number | 'prev' | 'next') => {
    const container = holderRef.current; if (!container) return;
    const frames = Array.from(container.querySelectorAll<HTMLElement>('.skills-frame')); if (frames.length <= 1) return;
    if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
    let next = 0;
    if (nextIndex === 'prev') next = (activeRef.current - 1 + frames.length) % frames.length;
    else if (nextIndex === 'next') next = (activeRef.current + 1) % frames.length;
    else next = nextIndex;
    const c = frames[activeRef.current]; const t = frames[next];
    gsap.to(c, { opacity: 0, duration: 0.8, ease: 'power2.in' });
    gsap.to(t, { opacity: 1, duration: 0.8, ease: 'power2.out' });
    activeRef.current = next; setActive(next);
    timerRef.current = window.setInterval(() => { const nn = (activeRef.current + 1) % frames.length; const cc = frames[activeRef.current]; const tt = frames[nn]; gsap.to(cc, { opacity: 0, duration: 0.8 }); gsap.to(tt, { opacity: 1, duration: 0.8 }); activeRef.current = nn; setActive(nn); }, 2800);
  };

  return (
    <div ref={holderRef} className="absolute inset-0">
      {sources.length === 0 ? (
        <Image src={fallback} alt="Skills" fill className="object-cover" />
      ) : (
        <>
          {sources.map((src, i) => (
            <Image key={i} src={src} alt={`Skill ${i + 1}`} fill className="skills-frame object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          ))}
          {sources.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-2 py-1 rounded-full bg-white/80 shadow-sm z-10">
              <button type="button" aria-label="Previous" className="px-2 py-1 text-maroon-800 hover:text-maroon-900" onClick={(e) => { e.stopPropagation(); manualNav('prev'); }}>‹</button>
              <div className="flex items-center gap-1">
                {sources.map((_, i) => (
                  <button key={i} aria-label={`Go to image ${i + 1}`} className={`w-2 h-2 rounded-full ${i === active ? 'bg-maroon-700' : 'bg-gray-400/70'}`} onClick={(e) => { e.stopPropagation(); manualNav(i); }} />
                ))}
              </div>
              <button type="button" aria-label="Next" className="px-2 py-1 text-maroon-800 hover:text-maroon-900" onClick={(e) => { e.stopPropagation(); manualNav('next'); }}>›</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
