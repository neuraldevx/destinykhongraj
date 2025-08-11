"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutFacts, profileImages } from "@/data/aboutFacts";
import Image from "next/image";
import Copy from "@/components/layout/Copy";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const factTimer = useRef<NodeJS.Timeout>();
  const imageTimer = useRef<NodeJS.Timeout>();

  // Auto-rotate fun facts
  useEffect(() => {
    const startFactRotation = () => {
      factTimer.current = setInterval(() => {
        setCurrentFactIndex((prev) => (prev + 1) % aboutFacts.length);
      }, 5000); // Slower like Jazmin's
    };

    startFactRotation();
    return () => {
      if (factTimer.current) clearInterval(factTimer.current);
    };
  }, []);

  // Auto-rotate profile images
  useEffect(() => {
    const startImageRotation = () => {
      imageTimer.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
      }, 4000); // Slower rotation
    };

    startImageRotation();
    return () => {
      if (imageTimer.current) clearInterval(imageTimer.current);
    };
  }, []);

  // GSAP animations
  useGSAP(() => {
    if (!aboutRef.current) return;

    const imageCard = aboutRef.current.querySelector(".image-card");

    // Image card entrance
    if (imageCard) {
      gsap.fromTo(imageCard, {
        scale: 0.95,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageCard,
          start: "top 80%",
        }
      });
    }

  }, { scope: aboutRef });

  // Animate number changes
  useEffect(() => {
    const animatedNumber = aboutRef.current?.querySelector('.animated-number');
    if (animatedNumber) {
      gsap.fromTo(animatedNumber, 
        { scale: 0.9, opacity: 0.7 },
        { 
          scale: 1, 
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        }
      );
    }
  }, [currentFactIndex]);

  return (
    <section 
      ref={aboutRef} 
      className="py-16 lg:py-24 px-4"
      style={{ backgroundColor: '#F0CCDF' }} // Jazmin's pink background
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <Copy className="mb-6">
            <h2 className="text-5xl lg:text-7xl font-light leading-tight text-gray-900">
              Digital storyteller crafting authentic experiences
            </h2>
          </Copy>
          
          <Copy delay={0.3}>
            <p className="text-xl lg:text-2xl font-light text-gray-700 max-w-3xl leading-relaxed">
              Where vision meets execution in perfect harmony
            </p>
          </Copy>
        </div>

        {/* Main content grid - 12 column like Jazmin's */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          
          {/* Image section - 6 columns on medium+ */}
          <div className="col-span-12 md:col-span-6">
            <div className="image-card">
              <div className="aspect-square rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm border border-white/30 shadow-xl">
                <div className="relative w-full h-full">
                  <Image
                    src={profileImages[currentImageIndex]}
                    alt={`Profile ${currentImageIndex + 1}`}
                    fill
                    className="object-cover transition-all duration-1000 ease-in-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                
                {/* Image indicators - Jazmin style */}
                <div className="absolute bottom-6 left-6 flex space-x-2">
                  {profileImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        // Reset timer
                        if (imageTimer.current) clearInterval(imageTimer.current);
                        imageTimer.current = setInterval(() => {
                          setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
                        }, 4000);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'bg-gray-800 scale-125' 
                          : 'bg-gray-400 hover:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content section - 6 columns on medium+ */}
          <div className="col-span-12 md:col-span-6 flex flex-col justify-center">
            
            {/* About text with Copy animations */}
            <div className="mb-12 space-y-8">
              <Copy delay={0.6}>
                <p className="text-lg lg:text-xl font-light text-gray-800 leading-relaxed">
                  I transform fleeting moments into eternal stories, weaving light and shadow 
                  into narratives that breathe life into brands.
                </p>
              </Copy>
              
              <Copy delay={0.8}>
                <p className="text-lg lg:text-xl font-light text-gray-800 leading-relaxed">
                  In the space between what is and what could be, I find magic. Through authentic 
                  storytelling, I help visions transcend the digital realm.
                </p>
              </Copy>
              
              <Copy delay={1.0}>
                <p className="text-lg lg:text-xl font-light text-gray-800 leading-relaxed">
                  My craft is rooted in the belief that every brand has a soul, every story 
                  deserves to be heard, and every moment holds infinite potential.
                </p>
              </Copy>
            </div>

            {/* Fun Fact Section - Jazmin style */}
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
              <div className="mb-6">
                <Copy delay={1.2}>
                  <h3 className="text-2xl font-medium text-gray-900 mb-4">
                    A little about me
                  </h3>
                </Copy>
                <div className="w-12 h-0.5 bg-gray-800 rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <Copy delay={1.4}>
                  <p className="text-lg font-light text-gray-700 leading-relaxed">
                    {aboutFacts[currentFactIndex].description}
                  </p>
                </Copy>
                
                <div className="py-4">
                  <div 
                    className="animated-number text-5xl lg:text-6xl font-light text-gray-900"
                    style={{ color: '#C43670' }} // Jazmin's accent pink
                  >
                    {aboutFacts[currentFactIndex].numericalValue.toLocaleString()}
                  </div>
                </div>
              </div>
              
              {/* Manual fact navigation */}
              <div className="flex space-x-2 mt-6">
                {aboutFacts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentFactIndex(index);
                      // Reset timer
                      if (factTimer.current) clearInterval(factTimer.current);
                      factTimer.current = setInterval(() => {
                        setCurrentFactIndex((prev) => (prev + 1) % aboutFacts.length);
                      }, 5000);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentFactIndex 
                        ? 'scale-110 shadow-md' 
                        : 'bg-gray-400 hover:bg-gray-600'
                    }`}
                    style={{ 
                      backgroundColor: index === currentFactIndex ? '#C43670' : undefined 
                    }}
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