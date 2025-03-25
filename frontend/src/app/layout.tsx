// frontend/src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import ScrollIndicator from "@/components/ScrollIndicator";
import Footer from "@/components/Footer";
import AnalyticsInitializer from "@/components/AnalyticsInitializer"; // Importera den nya komponenten

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Herman Engström | Full-Stack Developer Portfolio",
  description: "Explore the portfolio of Herman Engström, a full-stack developer skilled in React, Node.js, and more. View projects, skills, and contact information.",
  keywords: "full-stack developer, web developer, React, Node.js, portfolio, Herman Engström",
  openGraph: {
    title: "Herman Engström | Full-Stack Developer Portfolio",
    description: "Explore the portfolio of Herman Engström, a full-stack developer skilled in React, Node.js, and more.",
    url: "https://your-portfolio-url.com", // Uppdatera med din domän när du har en
    images: [
      {
        url: "/path-to-your-image.jpg", // Lägg till en bild för delning
        width: 1200,
        height: 630,
        alt: "Herman Engström Portfolio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem("theme") === "dark") {
                  document.documentElement.classList.add("dark");
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} antialiased bg-black dark:bg-gray-900 text-white dark:text-gray-200 transition-colors duration-300`}
      >
        <AnalyticsInitializer /> {/* Lägg till AnalyticsInitializer */}
        <ScrollIndicator />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}