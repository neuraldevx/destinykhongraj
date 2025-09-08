"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ShowcaseModalProps = {
  open: boolean;
  title: string;
  images: string[];
  onClose: () => void;
  tags?: string[];
};

export default function ShowcaseModal({ open, title, images, onClose, tags = [] }: ShowcaseModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Open / close animation + page scroll locking (switch to simple slide/fade)
  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    // helper: lock/unlock page scroll with overflow hidden on root (more robust across devices)
    let originalHtmlOverflow = "";
    let originalBodyOverflow = "";
    const lockScroll = () => {
      originalHtmlOverflow = document.documentElement.style.overflow;
      originalBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    };
    const unlockScroll = () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };

    if (open) {
      lockScroll();
      // ensure gallery scroll starts at top
      const scroller = panel.querySelector('[data-showcase-scroll]') as HTMLElement | null;
      if (scroller) scroller.scrollTop = 0;

      // Animate in: simple slide-up + fade for reliability
      const tl = gsap.timeline();
      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set(panel, { opacity: 0, y: 20 });
      tl.to(overlay, { autoAlpha: 1, duration: 0.2, ease: "power2.out" })
        .to(panel, { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }, "<");
    } else {
      unlockScroll();
      // Safely refresh ScrollTrigger to ensure page can scroll fully
      try { ScrollTrigger.refresh(true); } catch { /* ignore */ }
    }

    return () => {
      unlockScroll();
      try { ScrollTrigger.refresh(true); } catch { /* ignore */ }
    };
  }, [open]);

  // Close animation helper
  const closeWithFade = useCallback(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return onClose();
    const tl = gsap.timeline({ onComplete: () => { onClose(); } });
    tl.to(panel, { opacity: 0, scale: 0.98, duration: 0.18, ease: 'power2.in' })
      .to(overlay, { autoAlpha: 0, duration: 0.18, ease: 'power2.in' }, '<');
  }, [onClose]);

  // ESC key and background click
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          closeWithFade();
        }
      } else if (e.key === 'ArrowRight' && lightboxIndex !== null) {
        setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length));
      } else if (e.key === 'ArrowLeft' && lightboxIndex !== null) {
        setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, images.length, lightboxIndex, closeWithFade]);

  // Preload a few images for snappier opens
  useEffect(() => {
    if (!open || !images?.length) return;
    images.slice(0, 4).forEach((src) => { const i = new Image(); i.src = src; });
  }, [open, images]);

  // Stagger in gallery items after panel opens
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const items = panel.querySelectorAll('.showcase-item');
    if (!items.length) return;
    // Reveal with a light stagger
    gsap.fromTo(items, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.03, ease: 'power2.out', delay: 0.02 });
  }, [open, images]);

  

  const content = (
    <div
      ref={overlayRef}
      aria-hidden={!open}
      className={`fixed inset-0 z-[1000] ${open ? "pointer-events-auto" : "pointer-events-none"} p-3 sm:p-5 md:p-8`}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      // Center children reliably regardless of transforms on the panel
      style={{ display: 'grid', placeItems: 'center' }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" onClick={() => (lightboxIndex !== null ? setLightboxIndex(null) : closeWithFade())} />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} showcase gallery`}
        className="relative bg-cream/95 backdrop-blur-xl rounded-[28px] md:rounded-[36px] shadow-[0_18px_60px_rgba(0,0,0,0.35)] ring-1 ring-[#A68621]/25 overflow-hidden flex flex-col w-full max-w-[1200px] h-[min(92vh,1000px)] z-[1010] will-change-transform [contain:layout_paint_size]"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="z-10 bg-cream/95 backdrop-blur border-b border-[#A68621]/30">
          <div className="flex items-center justify-between p-4 md:p-6">
            <h3 className="text-heading text-2xl md:text-3xl font-extrabold tracking-tight pr-4">{title} — Showcase</h3>
            <div className="flex items-center gap-3">
              <button onClick={closeWithFade} className="rounded-full px-4 py-2 border border-[#A68621]/50 text-subheading hover:bg-[#A68621]/10 transition-colors">Close</button>
            </div>
          </div>
          {tags?.length ? (
            <div className="px-4 md:px-6 pb-3 overflow-x-auto no-scrollbar">
              <div className="flex gap-2 w-max">
                {tags.map((t) => (
                  <span key={t} className="px-2 py-1 rounded-full text-xs border border-[#A68621]/40 text-subheading/80 bg-white/70 whitespace-nowrap">{t}</span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Scrollable content area (must have min-h-0 in flex layouts) */}
        <div
          data-showcase-scroll
          className="min-h-0 grow overflow-y-auto overscroll-contain p-4 md:p-6 scroll-pb-12 [scrollbar-gutter:stable]"
          style={{ WebkitOverflowScrolling: 'touch', overscrollBehaviorY: 'contain', touchAction: 'pan-y' }}
        >
          {images.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((src, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="showcase-item block w-full group text-left rounded-2xl overflow-hidden border border-[#A68621]/20 bg-white shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-[#A68621]/50"
                >
                  {/* Reserve space so the container can scroll even before images load */}
                  <div className="relative w-full aspect-[4/3] bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt="Showcase image"
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-contain transform-gpu transition-transform duration-300 ease-out will-change-transform group-hover:scale-[1.02]"
                    />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center text-subheading/70">No images yet — coming soon.</div>
          )}
          {/* Fade masks to imply scrollable content */}
          <div className="pointer-events-none fixed inset-x-0" style={{ top: 'env(safe-area-inset-top, 0)' }} />
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div className="absolute inset-0 z-20 bg-black/70 flex items-center justify-center p-4" onClick={() => setLightboxIndex(null)}>
            <div className="relative max-w-[92vw] max-h-[85vh] will-change-transform" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[lightboxIndex]} alt="Expanded image" className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-lg" loading="eager" fetchPriority="high" decoding="async" />
              <button aria-label="Previous" onClick={() => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length))} className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-cream/90 text-subheading rounded-full shadow border border-[#A68621]/40">‹</button>
              <button aria-label="Next" onClick={() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length))} className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-cream/90 text-subheading rounded-full shadow border border-[#A68621]/40">›</button>
              <button aria-label="Close" onClick={() => setLightboxIndex(null)} className="absolute -top-3 -right-3 p-2 bg-cream text-subheading rounded-full shadow border border-[#A68621]/40">✕</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  if (!open) return null;
  if (typeof window === 'undefined') return null;
  return createPortal(content, document.body);
}
