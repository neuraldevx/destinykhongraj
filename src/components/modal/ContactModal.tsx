"use client";

import { useStore } from "@/lib/zustand/stores";

export default function ContactModal() {
  const { isContactModalOpen, setIsContactModalOpen } = useStore();

  if (!isContactModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Get in Touch</h2>
        <p className="text-gray-600 mb-6">Contact form coming soon...</p>
        <button
          onClick={() => setIsContactModalOpen(false)}
          className="w-full bg-[#C43670] text-white py-2 px-4 rounded hover:bg-[#a52c5a] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}