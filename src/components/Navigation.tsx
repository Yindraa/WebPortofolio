"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Code2, Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/40 shadow-xl shadow-primary/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand - Proper text glow effect */}
          <Link
            href="/"
            className="group flex items-center gap-3 text-2xl font-bold relative"
          >
            {/* Animated icon with proper glow */}
            <div className="relative transition-all duration-500 ease-out">
              <Code2
                size={28}
                className="text-blue-600 group-hover:text-purple-600 transition-all duration-500 ease-out group-hover:rotate-12 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]"
              />
              <Sparkles
                size={16}
                className="absolute -top-1 -right-1 text-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out animate-pulse group-hover:drop-shadow-[0_0_4px_rgba(147,51,234,0.8)]"
              />
            </div>

            {/* Text with proper glow effect that follows text shape */}
            <span className="relative transition-all duration-500 ease-out underline-animate">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-size-200 animate-gradient-x group-hover:drop-shadow-[0_0_12px_rgba(147,51,234,0.8)] transition-all duration-500 ease-out">
                Portfolio
              </span>
            </span>
          </Link>

          {/* Desktop Navigation - Smoother animations */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-underline px-4 py-2 text-foreground/70 hover:text-foreground font-medium transition-all duration-500 ease-out rounded-xl hover:bg-accent/30 group"
                style={{
                  animationDelay: `${index * 150}ms`,
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {/* Text with smooth scaling and glow */}
                <span className="relative z-10 transition-all duration-500 ease-out group-hover:scale-105 group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]">
                  {item.label}
                </span>

                {/* Subtle hover background with smooth scaling */}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out scale-90 group-hover:scale-100"></span>
              </Link>
            ))}

            {/* Enhanced Theme Toggle with smooth separator */}
            <div className="ml-6 pl-6 border-l border-border/20 transition-all duration-500 ease-out">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Navigation Button - Smoother transitions */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              className="group relative p-3 rounded-xl hover:bg-accent/30 transition-all duration-500 ease-out hover:scale-105"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 text-foreground transition-all duration-500 ease-out ${
                    isOpen
                      ? "rotate-180 opacity-0 scale-75"
                      : "rotate-0 opacity-100 scale-100"
                  }`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 text-foreground transition-all duration-500 ease-out ${
                    isOpen
                      ? "rotate-0 opacity-100 scale-100"
                      : "-rotate-180 opacity-0 scale-75"
                  }`}
                />
              </div>

              {/* Smooth button glow effect */}
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out scale-90 group-hover:scale-100"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Much smoother animations */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-700 ease-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-6 border-t border-border/20 bg-background/95 backdrop-blur-xl rounded-b-3xl shadow-xl shadow-primary/5 transition-all duration-500 ease-out">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="mobile-nav-underline group flex items-center py-4 px-6 text-foreground/70 hover:text-foreground hover:bg-accent/20 transition-all duration-500 ease-out rounded-xl mx-3 font-medium"
                onClick={() => setIsOpen(false)}
                style={{
                  transform: isOpen
                    ? "translateX(0) translateY(0)"
                    : "translateX(-30px) translateY(-10px)",
                  opacity: isOpen ? 1 : 0,
                  transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${
                    index * 100 + 200
                  }ms`,
                }}
              >
                <span className="relative transition-all duration-500 ease-out group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
