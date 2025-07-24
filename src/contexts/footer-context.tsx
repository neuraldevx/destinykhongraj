"use client";

import React, { createContext, useContext, useState, type ReactNode } from "react";

interface FooterContextType {
  isFooterVisible: boolean;
  setIsFooterVisible: (visible: boolean) => void;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

interface FooterProviderProps {
  children: ReactNode;
}

export function FooterProvider({ children }: FooterProviderProps) {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  return (
    <FooterContext.Provider value={{ isFooterVisible, setIsFooterVisible }}>
      {children}
    </FooterContext.Provider>
  );
}

export function useFooter() {
  const context = useContext(FooterContext);
  if (context === undefined) {
    throw new Error("useFooter must be used within a FooterProvider");
  }
  return context;
}