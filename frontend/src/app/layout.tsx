import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import ScrollIndicator from "@/components/ScrollIndicator";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Adminpanel & frontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" suppressHydrationWarning>
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
        <ScrollIndicator />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}