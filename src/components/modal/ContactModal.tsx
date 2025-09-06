"use client";

import { useContactModalStore } from "@/lib/zustand/stores";

export default function ContactModal() {
  const isOpen = useContactModalStore((s) => s.isModalOpen);
  const close = useContactModalStore((s) => s.close);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contact modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={close}
    >
      <div
        className="bg-pearl p-8 rounded-lg max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-charcoal">Get in Touch</h2>
        <p className="text-slate mb-6">Contact form coming soon...</p>
        <button
          onClick={close}
          className="w-full bg-accent text-white py-2 px-4 rounded hover:bg-accent/80 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
