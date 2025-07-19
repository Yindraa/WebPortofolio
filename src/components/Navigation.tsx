"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Code2 } from "lucide-react"; // 'Sparkles' dihapus dari sini
import { ThemeToggle } from "./theme-toggle";

// Menambahkan beberapa gaya CSS kustom untuk animasi
const GlobalStyles = () => (
  <style jsx global>{`
    .nav-link-underline {
      position: relative;
      text-decoration: none;
    }
    .nav-link-underline::after {
      content: "";
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 2px;
      bottom: -4px;
      left: 0;
      background-color: hsl(var(--primary));
      transform-origin: bottom center;
      transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .nav-link-underline:hover::after {
      transform: scaleX(1);
      transform-origin: bottom center;
    }
  `}</style>
);

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // Mengubah threshold menjadi lebih kecil untuk efek lebih cepat
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <GlobalStyles />
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
          scrolled || isOpen
            ? "bg-background/80 backdrop-blur-lg border-b border-border/20 shadow-md"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 text-xl font-bold"
            >
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                <Code2
                  size={24}
                  className="text-primary transition-all duration-300 ease-in-out group-hover:rotate-12 group-hover:scale-110"
                />
              </div>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Portfolio
              </span>
            </Link>

            {/* Navigasi Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Aksi di Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <a
                href="#contact"
                className="px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                Hire Me
              </a>
            </div>

            {/* Tombol Menu Mobile */}
            <div className="md:hidden flex items-center">
              <ThemeToggle />
              <button
                className="ml-4 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-screen border-t border-border/20" : "max-h-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-300"
                onClick={() => setIsOpen(false)}
                style={{
                  transform: isOpen ? "translateY(0)" : "translateY(-10px)",
                  opacity: isOpen ? 1 : 0,
                  transition: `transform 0.3s ease-in-out ${
                    index * 75
                  }ms, opacity 0.3s ease-in-out ${index * 75}ms`,
                }}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 px-3">
              <a
                href="#contact"
                className="block w-full text-center px-4 py-3 text-base font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
