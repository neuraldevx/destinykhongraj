"use client";

import { useState } from "react";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-pearl p-8 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-charcoal">Get in Touch</h2>
        <p className="text-slate mb-6">Contact form coming soon...</p>
        <button
          onClick={() => setIsOpen(false)}
          className="w-full bg-accent text-white py-2 px-4 rounded hover:bg-accent/80 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}