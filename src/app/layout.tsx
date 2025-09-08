import { ReactLenis } from "lenis/react";
import { Analytics } from "@vercel/analytics/react";
import { metadata } from "@/metadata";
// Use global font (Gambarino) defined in globals.css
import DocumentTitleChanger from "@/components/layout/DocumentTitleChanger";
import ContactModal from "@/components/modal/ContactModal";
import FixedContactButton from "@/components/layout/FixedContactButton";
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
          <body className={`font-semibold antialiased bg-cream text-subheading`}>
            <DocumentTitleChanger />

            {children}
            <FixedContactButton />
            <ContactModal />
            <Analytics />
          </body>
        </ReactLenis>
      </FooterProvider>
    </html>
  );
}
