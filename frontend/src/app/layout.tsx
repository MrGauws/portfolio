import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import ScrollIndicator from "@/components/ScrollIndicator";
import Footer from "@/components/Footer";
import AnalyticsInitializer from "@/components/AnalyticsInitializer";
import { AuthProvider } from "../context/AuthContext";
import Background from "@/components/Background"; // Importera den nya komponenten

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Herman Engström | Full-Stack Developer Portfolio",
  description: "Explore the portfolio of Herman Engström, a full-stack developer skilled in React, Node.js, and more. View projects, skills, and contact information.",
  keywords: "full-stack developer, web developer, React, Node.js, portfolio, Herman Engström",
  metadataBase: new URL("https://hengstrom.se"),
  openGraph: {
    title: "Herman Engström | Full-Stack Developer Portfolio",
    description: "Explore the portfolio of Herman Engström, a full-stack developer skilled in React, Node.js, and more.",
    url: "https://hengstrom.se",
    images: [
      {
        url: "/path-to-your-image.jpg",
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
    <html lang="en">
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
        className={`${montserrat.variable} antialiased min-h-screen transition-colors duration-300 relative bg-black dark:bg-gray-900`}
      >
        {/* Bakgrundsbild, parallax och partiklar */}
        <Background />
        
        <AuthProvider>
          <AnalyticsInitializer />
          <ScrollIndicator />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer className="relative z-10" />
        </AuthProvider>
      </body>
    </html>
  );
}