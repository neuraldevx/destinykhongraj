import { create } from "zustand";

interface ContactModalState {
  isModalOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useContactModalStore = create<ContactModalState>((set) => ({
  isModalOpen: false,
  open: () => set({ isModalOpen: true }),
  close: () => set({ isModalOpen: false }),
  toggle: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));

