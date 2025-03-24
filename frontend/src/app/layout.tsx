import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Navbar } from "@/components/Navbar";

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
        className={`${montserrat.variable} antialiased bg-black text-white transition-colors duration-300`}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}