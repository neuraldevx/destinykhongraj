import type { Metadata } from "next";
import "./globals.css";
import React from 'react';
import { inter, crimson_text } from "@/fonts";

export const metadata: Metadata = {
  title: "Destiny Khongraj Portfolio",
  description: "Portfolio website for Destiny Khongraj.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${crimson_text.variable} font-inter antialiased`}>
        {children}
      </body>
    </html>
  );
}
