import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import GlobalCursor from "../components/GlobalCursor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Made Narayindra - IT Student Portfolio",
  description:
    "Portfolio website showcasing my projects and skills as an IT student",
  keywords: [
    "portfolio",
    "IT student",
    "web development",
    "programming",
    "Made Narayindra",
  ],
  authors: [{ name: "Made Narayindra" }],
  openGraph: {
    title: "Made Narayindra - IT Student Portfolio",
    description:
      "Portfolio website showcasing my projects and skills as an IT student",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background text-foreground transition-colors duration-500 ease-in-out`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* PERBAIKAN: 
            - Konten utama dibungkus dalam <main>
            - GlobalCursor ditempatkan di luar <main> untuk isolasi penuh
          */}
          <main>{children}</main>
          <GlobalCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
