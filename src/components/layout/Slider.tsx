"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";
import useWindowSize from "@/hooks/useWindowSize";

gsap.registerPlugin(useGSAP, Observer);

type SliderProps = {
  images: string[];
};

export default function Slider({ images }: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const totalRef = useRef(0);
  const xToRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const itemValuesRef = useRef<number[]>([]);
  const sliderTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const { width } = useWindowSize();

  useGSAP(() => {
    if (!sliderRef.current) return;

    const content = sliderRef.current;
    const cards = content.querySelectorAll(".slider-card");
    const cardsLength = cards.length / 2;
    const half = content.clientWidth / 2;

    const wrap = gsap.utils.wrap(-half, 0);

    xToRef.current = gsap.quickTo(content, "x", {
      duration: 0.5,
      ease: "power3",
      modifiers: {
        x: gsap.utils.unitize(wrap),
      },
    });

    itemValuesRef.current = [];
    for (let i = 0; i < cardsLength; i++) {
      itemValuesRef.current.push((Math.random() - 0.5) * 20);
    }

    const tl = gsap.timeline({ paused: true });
    tl.to(cards, {
      rotate: (index) => itemValuesRef.current[index % cardsLength],
      xPercent: (index) => itemValuesRef.current[index % cardsLength],
      yPercent: (index) => itemValuesRef.current[index % cardsLength],
      scale: 0.97,
      duration: 0.5,
      ease: "back.inOut(2.5)",
    });

    sliderTimelineRef.current = tl;

    const observer = Observer.create({
      target: content,
      type: "pointer,touch",
      onPress: () => tl.play(),
      onDrag: (self) => {
        totalRef.current += self.deltaX;
        if (xToRef.current) xToRef.current(totalRef.current);
      },
      onRelease: () => tl.reverse(),
      onStop: () => tl.reverse(),
    });

    const tick = (_time: number, deltaTime: number) => {
      totalRef.current -= deltaTime / 10;
      if (xToRef.current) xToRef.current(totalRef.current);
    };

    gsap.ticker.add(tick);

    return () => {
      observer.kill();
      gsap.ticker.remove(tick);
      if (sliderTimelineRef.current) sliderTimelineRef.current.kill();
    };
  }, []);

  const allImages = [...images, ...images];

  return (
    <div
      className="
        overflow-x-hidden py-12
        bg-[radial-gradient(100%_80%_at_50%_0%,rgba(255,255,255,0.04),transparent)]
      "
    >
      <div
        ref={sliderRef}
        className="w-max whitespace-nowrap flex gap-[clamp(8px,1vw,16px)] pr-[clamp(8px,1vw,16px)]"
      >
        {allImages.map((imageUrl, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              duration: 2.0,
              delay: width < 768 ? 1.8 : 2.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              slider-card group relative p-[1px] rounded-2xl
              bg-gradient-to-br from-fuchsia-500/40 via-white/5 to-cyan-500/40
              shadow-[0_10px_30px_rgba(0,0,0,0.35)]
              transform-gpu
            "
          >
            <div
              className="
                relative rounded-[14px] overflow-hidden
                bg-neutral-900/40 backdrop-blur-xl
                ring-1 ring-white/10
                transition-transform duration-400 ease-out
                group-hover:scale-[1.01] active:scale-[0.995]
              "
            >
              {/* aurora glow accent */}
              <div
                aria-hidden
                className="
                  pointer-events-none absolute -inset-px opacity-0
                  group-hover:opacity-100 transition-opacity duration-500
                  blur-xl
                "
                style={{
                  background:
                    "radial-gradient(60% 40% at 20% 0%, rgba(236,72,153,0.25), transparent 60%), radial-gradient(60% 40% at 80% 30%, rgba(59,130,246,0.22), transparent 60%), radial-gradient(60% 40% at 50% 100%, rgba(34,211,238,0.18), transparent 60%)",
                }}
              />

              <div className="w-[clamp(260px,20vw,400px)] h-[clamp(320px,25vw,450px)] rounded-[12px] overflow-hidden relative select-none">
                <Image
                  src={imageUrl}
                  alt={`Slider image ${index + 1}`}
                  width={400}
                  height={450}
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 20vw, 400px"
                  className="object-cover object-center pointer-events-none select-none w-full h-full"
                />

                {/* subtle vignette and highlight */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(120% 100% at 50% 10%, rgba(255,255,255,0.10) 0, rgba(255,255,255,0.05) 20%, transparent 60%), linear-gradient(to bottom, rgba(255,255,255,0.06), transparent 40%, rgba(0,0,0,0.25))",
                  }}
                />

                {/* soft top edge light */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
