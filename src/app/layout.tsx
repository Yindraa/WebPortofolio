import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import GlobalCursor from "../components/GlobalCursor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Name - IT Student Portfolio",
  description:
    "Portfolio website showcasing my projects and skills as an IT student",
  keywords: ["portfolio", "IT student", "web development", "programming"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Name - IT Student Portfolio",
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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {children}
            <GlobalCursor />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
