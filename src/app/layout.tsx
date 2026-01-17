import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-lato" });

export const metadata: Metadata = {
  title: "AI Marketing Agency | Luxury Digital Presence",
  description: "Bespoke AI marketing, visual storytelling, and automated elegance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Default to light mode (removed 'dark' class)
    <html lang="en">
      <body
        className={`${playfair.variable} ${lato.variable} font-sans antialiased bg-background text-foreground assignment-scroll`}
      >
        {children}
      </body>
    </html>
  );
}
