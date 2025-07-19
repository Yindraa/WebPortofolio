"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Code2, ArrowUp } from "lucide-react";

const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    { href: "https://github.com/Yindraa", label: "GitHub", icon: Github },
    {
      href: "https://www.linkedin.com/in/made-narayindra-10aa24244",
      label: "LinkedIn",
      icon: Linkedin,
    },
    { href: "mailto:madenarayindra23@gmail.com", label: "Email", icon: Mail },
  ];

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Bagian Logo dan Deskripsi */}
          <div className="flex flex-col items-center md:items-start">
            <Link
              href="/"
              className="group flex items-center gap-2 text-xl font-bold mb-4"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <Code2 size={24} className="text-primary" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Portfolio
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Terima kasih telah mengunjungi portofolio saya. Mari terhubung!
            </p>
          </div>

          {/* Bagian Tautan Navigasi */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigasi</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bagian Tautan Sosial */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Terhubung</h3>
            <div className="flex justify-center md:justify-start gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-secondary-foreground/5 hover:bg-secondary-foreground/10 rounded-full text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label={link.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bagian Copyright */}
        <div className="mt-12 pt-8 border-t border-border/20 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Made Narayindra. Dibuat dengan Next.js & Tailwind
            CSS.
          </p>
        </div>
      </div>

      {/* Tombol Kembali ke Atas */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-primary/90 hover:scale-110
          ${
            showBackToTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        aria-label="Kembali ke atas"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
