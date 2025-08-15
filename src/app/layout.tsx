import { ReactLenis } from "lenis/react";
import { Analytics } from "@vercel/analytics/react";
import { metadata } from "@/metadata";
import { inter } from "@/fonts";
import DocumentTitleChanger from "@/components/layout/DocumentTitleChanger";
// import ContactModal from "@/components/modal/ContactModal";
import "./globals.css";
import { FooterProvider } from "@/contexts/footer-context";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <FooterProvider>
        <ReactLenis root>
          <body
            className={`${inter.className} font-semibold antialiased bg-white text-gray-900`}
          >
            <DocumentTitleChanger />

            {children}
            {/* <ContactModal /> */}
            <Analytics />
          </body>
        </ReactLenis>
      </FooterProvider>
    </html>
  );
}
