import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
      <body className={`${inter.variable} antialiased bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300`}>

        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}