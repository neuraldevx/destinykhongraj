"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { aboutFacts } from "@/data/aboutFacts";
import Image from "next/image";
import Copy from "@/components/layout/Copy";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const factTimer = useRef<NodeJS.Timeout>();
  const firstRun = useRef(true);

  useEffect(() => {
    factTimer.current = setInterval(() => {
      setCurrentFactIndex(prev => (prev + 1) % aboutFacts.length);
    }, 5000);
    return () => {
      if (factTimer.current) clearInterval(factTimer.current);
    };
  }, []);

  useGSAP(() => {
    if (!aboutRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
      },
    });
    tl.from(".about-image", { x: -50, opacity: 0, duration: 1, ease: "power2.out" })
      .from(".about-content", { x: 50, opacity: 0, duration: 1, ease: "power2.out" }, "<");
  }, { scope: aboutRef });

  useEffect(() => {
    const numberEl = aboutRef.current?.querySelector(".animated-number");
    if (numberEl) {
      const current = aboutFacts[currentFactIndex].numericalValue;
      const start = firstRun.current ? 0 :
        aboutFacts[(currentFactIndex - 1 + aboutFacts.length) % aboutFacts.length].numericalValue;
      firstRun.current = false;
      gsap.fromTo(numberEl, { textContent: start }, {
        textContent: current,
        duration: 1,
        ease: "power2.out",
        snap: { textContent: 1 }
      });
    }
  }, [currentFactIndex]);

  return (
    <section ref={aboutRef} className="bg-midnight text-mist py-16 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <Copy className="mb-6">
            <h2 className="text-5xl lg:text-7xl font-light leading-tight text-mist">
              Digital storyteller crafting authentic experiences
            </h2>
          </Copy>
          <Copy delay={0.3}>
            <p className="text-xl lg:text-2xl font-light text-aluminum max-w-3xl leading-relaxed">
              Where vision meets execution in perfect harmony
            </p>
          </Copy>
        </div>

        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          <div className="about-image col-span-12 md:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-rose/20 shadow-xl">
              <div className="relative w-full h-full aspect-square">
                <Image
                  src={aboutFacts[currentFactIndex].imageUrl}
                  alt={`About image ${currentFactIndex + 1}`}
                  fill
                  className="object-cover transition-all duration-1000 ease-in-out"
                  sizes="(max-width:768px)100vw,50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          <div className="about-content col-span-12 md:col-span-6 flex flex-col justify-center">
            <div className="mb-12 space-y-8">
              <Copy delay={0.6}>
                <p className="text-lg lg:text-xl font-light text-mist leading-relaxed">
                  I transform fleeting moments into eternal stories, weaving light and shadow
                  into narratives that breathe life into brands.
                </p>
              </Copy>
              <Copy delay={0.8}>
                <p className="text-lg lg:text-xl font-light text-mist leading-relaxed">
                  In the space between what is and what could be, I find magic. Through authentic
                  storytelling, I help visions transcend the digital realm.
                </p>
              </Copy>
              <Copy delay={1.0}>
                <p className="text-lg lg:text-xl font-light text-mist leading-relaxed">
                  My craft is rooted in the belief that every brand has a soul, every story deserves
                  to be heard, and every moment holds infinite potential.
                </p>
              </Copy>
            </div>

            <div className="bg-rose/10 backdrop-blur-sm rounded-2xl p-8 border border-rose/20 shadow-lg">
              <div className="mb-6">
                <Copy delay={1.2}>
                  <h3 className="text-2xl font-medium text-mist mb-4">
                    A little about me
                  </h3>
                </Copy>
                <div className="w-12 h-0.5 bg-coral rounded-full"></div>
              </div>

              <div className="space-y-6">
                <Copy delay={1.4}>
                  <p className="text-lg font-light text-aluminum leading-relaxed">
                    {aboutFacts[currentFactIndex].description}
                  </p>
                </Copy>

                <div className="py-4">
                  <div className="animated-number text-5xl lg:text-6xl font-light text-coral">0</div>
                </div>
              </div>

              <div className="flex space-x-2 mt-6">
                {aboutFacts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentFactIndex(index);
                      if (factTimer.current) clearInterval(factTimer.current);
                      factTimer.current = setInterval(() => {
                        setCurrentFactIndex(prev => (prev + 1) % aboutFacts.length);
                      }, 5000);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentFactIndex ? 'bg-coral scale-110 shadow-md' : 'bg-aluminum hover:bg-mist'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

