"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function animateFrom(elem: HTMLElement, direction = 1) {
  let x = 0;
  let y = direction * 100;
  
  if (elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }
  
  elem.style.transform = `translate(${x}px, ${y}px)`;
  elem.style.opacity = "0";
  
  gsap.fromTo(elem, 
    { x, y, autoAlpha: 0 }, 
    {
      duration: 1.25,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "expo",
      overwrite: "auto"
    }
  );
}

function hide(elem: HTMLElement) {
  gsap.set(elem, { autoAlpha: 0 });
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reveals = gsap.utils.toArray(".gs_reveal") as HTMLElement[];
    
    reveals.forEach((elem) => {
      hide(elem);
      
      ScrollTrigger.create({
        trigger: elem,
        onEnter: () => animateFrom(elem),
        onEnterBack: () => animateFrom(elem, -1),
        onLeave: () => hide(elem)
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="content bg-cream px-4 py-16 lg:py-20">
      <style jsx>{`
        .content__hero {
          height: 40vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .content__heading {
          text-align: center;
          font-size: clamp(2rem, 8vw, 4rem);
          font-weight: 300;
          color: #A7292F; /* heading */
        }
        
        .features {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }
        
        .features__item {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 2rem;
          height: 100vh;
          border-top: dashed 2px #A68621; /* gold */
        }
        
        .features__item--left {
          flex-direction: row;
          text-align: right;
        }
        
        .features__item--right {
          flex-direction: row-reverse;
        }
        
        .features__image {
          flex: 1 1 40%;
          position: relative;
        }
        
        .features__card {
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 1 / 1;
        }
        
        .features__img {
          width: 100%;
          height: 100%;
          position: absolute;
          object-fit: cover;
          display: block;
        }
        
        .features__content {
          flex: 1 1 55%;
        }
        
        .features__title {
          font-size: 1.8em;
          margin-block-end: 1rem;
          font-weight: 600;
          color: #A7292F; /* heading */
        }
        
        .features__description {
          line-height: 1.6;
          color: #290102; /* subheading */
          font-size: 1.1rem;
        }
        
        .gs_reveal {
          opacity: 0;
          visibility: hidden;
          will-change: transform, opacity;
        }
        
        /* remove artificial spacer to reduce gap before footer */
        
        @media (max-width: 768px) {
          .features__item {
            flex-direction: column !important;
            text-align: center !important;
            height: auto;
            min-height: 80vh;
          }
          
          .features__image {
            flex: 1 1 100%;
            max-width: 400px;
          }
          
          .features__content {
            flex: 1 1 100%;
          }
        }
      `}</style>
      
      <div className="content__hero">
        <h1 className="content__heading gs_reveal">
          Featured Work & Creative Vision
        </h1>
      </div>
      
      <div className="features">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`features__item ${
              index % 2 === 0 ? 'features__item--left' : 'features__item--right'
            } gs_reveal ${
              index % 2 === 0 ? 'gs_reveal_fromLeft' : 'gs_reveal_fromRight'
            }`}
          >
            <div className="features__image">
              <div className="features__card">
                <Image
                  className="features__img"
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="features__content">
              <h2 className="features__title gs_reveal">{project.title}</h2>
              <p 
                className="features__description gs_reveal"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-accent text-cream px-5 py-2 rounded-full font-medium hover:bg-accent/90 transition-colors"
                >
                  View Here
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Spacer removed to tighten layout before footer */}
    </section>
  );
}
