import type { Metadata } from "next";
import { Urbanist, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// Urbanist for content, JetBrains Mono for technical/label accents.
// Both are variable fonts, so we don't pin specific weights.
const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MHC++ — Unite CS at CUNY",
  description:
    "MHC++ brings together computer science students from across The City University of New York.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col overflow-x-hidden">
        {/* Faint dot/grid background behind everything (mockup parity). */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <Nav />
        <main className="relative z-[1] flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
