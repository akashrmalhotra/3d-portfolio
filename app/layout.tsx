import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raymond — The Complete Man. The Incomplete Platform.",
  description:
    "Platformising Raymond's latent network of 20,000 tailors. The synthesis of transactions into identities.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollSmoother.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.19/dist/lenis.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js" strategy="beforeInteractive" />
        <Script src="https://unpkg.com/split-type" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/postprocessing@6.28.7/build/postprocessing.min.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
