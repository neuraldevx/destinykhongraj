import { create } from "zustand";

interface StoreState {
  isContactModalOpen: boolean;
  setIsContactModalOpen: (open: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  isContactModalOpen: false,
  setIsContactModalOpen: (open: boolean) => set({ isContactModalOpen: open }),
}));