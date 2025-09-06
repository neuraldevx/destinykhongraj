"use client";

import { motion } from "motion/react";
import { IconMail, IconSend2 } from "@tabler/icons-react";
import Image from "next/image";
import { useRef, useEffect, useMemo, useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import { useContactModalStore } from "@/lib/zustand/stores";

// Minimal shape for a contact form ref if provided by the app
export interface ContactFormRef {
  submit: () => void;
}

interface FixedContactButtonProps {
  formRef?: React.RefObject<ContactFormRef>;
}

export default function FixedContactButton({ formRef }: FixedContactButtonProps) {
  const isModalOpen = useContactModalStore((s) => s.isModalOpen);
  const toggleModal = useContactModalStore((s) => s.toggle);

  const { width } = useWindowSize();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Track if footer is in view by observing the #footer element
  const [isFooterInView, setIsFooterInView] = useState(false);
  const footerEl = useMemo(() => {
    if (typeof document === "undefined") return null;
    return document.getElementById("footer");
  }, []);

  useEffect(() => {
    if (!footerEl) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setIsFooterInView(entries.some((e) => e.isIntersecting));
      },
      { threshold: 0.2 }
    );
    observer.observe(footerEl);
    return () => observer.disconnect();
  }, [footerEl]);

  // Initial entrance delay (to avoid clashing with hero/intro)
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIsInitialLoad(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    if (isModalOpen && formRef?.current) {
      formRef.current.submit();
    } else {
      toggleModal();
    }
  };

  return (
    <motion.button
      initial={{ y: 200, scale: 0.8 }}
      animate={isFooterInView && !isModalOpen ? { y: 200, scale: 0.8 } : { y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: isInitialLoad ? 3 : 0 }}
      onClick={handleClick}
      ref={buttonRef}
      aria-label={isModalOpen ? "Submit contact form" : "Open contact form"}
      className={`${
        isModalOpen ? "bg-accent" : "bg-pearl"
      } fixed bottom-8 left-1/2 -translate-x-1/2 pl-1 py-1 pr-4 xl:pr-6 rounded-full shadow-2xl cursor-pointer group z-50 transition-colors duration-700 delay-100 ease-in-out flex items-center gap-2 xl:gap-3`}
    >
      <div className="h-12 xl:h-16 w-12 xl:w-16 relative rounded-full">
        <div
          className={`${
            isModalOpen ? "opacity-0" : ""
          } w-full h-full rounded-full overflow-hidden relative group-hover:opacity-0 group-hover:scale-75 transition-all duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)]`}
        >
          <Image
            src="/images/about/about-1.png"
            alt="Contact avatar"
            fill
            className="w-full h-auto object-cover object-center"
            sizes="(max-width: 768px) 48px, (max-width: 1280px) 64px, 64px"
            priority={false}
          />
        </div>

        <span
          className={`${
            isModalOpen ? "opacity-0" : ""
          } flex items-center justify-center h-12 xl:h-16 w-12 xl:w-16 bg-pearl rounded-full scale-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-100 transition-all duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)]`}
        >
          <IconMail className="text-accent" stroke={2.5} size={width < 728 ? 20 : 30} />
        </span>

        <span
          className={`${
            isModalOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"
          } h-12 xl:h-16 w-12 xl:w-16 bg-pearl rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden flex items-center justify-end transition-all duration-200 delay-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)]`}
        >
          <div className="flex transition-transform duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)] group-hover:translate-x-1/2">
            <div className="flex items-center justify-center w-12 xl:w-16">
              <IconSend2 className="text-accent" stroke={2.5} size={width < 728 ? 20 : 30} />
            </div>
            <div className="flex items-center justify-center w-12 xl:w-16">
              <IconSend2 className="text-accent" stroke={2.5} size={width < 728 ? 20 : 30} />
            </div>
          </div>
        </span>
      </div>

      <div className={`${isModalOpen ? "text-pearl" : "text-accent"} overflow-hidden h-7 lg:h-9`}>
        <div className="flex flex-col transition-transform duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)] group-hover:-translate-y-1/2">
          <span className="text-xl lg:text-3xl font-semibold">{isModalOpen ? "Submit" : "Contact"}</span>
          <span className="text-xl lg:text-3xl font-semibold">{isModalOpen ? "Submit" : "Contact"}</span>
        </div>
      </div>
    </motion.button>
  );
}

