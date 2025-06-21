"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowDown,
  Sparkles,
  Code,
  Palette,
  Monitor,
  Globe,
} from "lucide-react";

interface CursorTrail {
  x: number;
  y: number;
  id: number;
}

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentSpecialization, setCurrentSpecialization] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState<CursorTrail[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const trailIdRef = useRef(0);

  // 🖼️ YOUR LOCAL IMAGE PATH - Image should be in /public folder
  const profileImageUrl = "/Indra.jpg"; // This points to public/Indra.jpg

  const specializations = [
    {
      text: "UI/UX Designer",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      description: "Creating beautiful and intuitive user experiences",
    },
    {
      text: "Desktop App Developer",
      icon: Monitor,
      color: "from-blue-500 to-cyan-500",
      description: "Building powerful cross-platform desktop applications",
    },
    {
      text: "PWA Developer",
      icon: Globe,
      color: "from-green-500 to-emerald-500",
      description: "Developing modern Progressive Web Applications",
    },
    {
      text: "Full-Stack Developer",
      icon: Code,
      color: "from-purple-500 to-violet-500",
      description: "End-to-end web application development",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentSpecialization((prev) => (prev + 1) % specializations.length);
        setIsTyping(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, [mounted, specializations.length]);

  // Cursor tracking and trail effect - ONLY within Hero section
  useEffect(() => {
    if (!mounted) return;

    const heroSection = document.querySelector("#hero-section");
    if (!heroSection) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroSection.getBoundingClientRect();
      const isInHero =
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right;

      if (isInHero) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsHovering(true);

        // Add new trail point
        const newTrail: CursorTrail = {
          x: e.clientX,
          y: e.clientY,
          id: trailIdRef.current++,
        };

        setCursorTrail((prev) => [...prev.slice(-8), newTrail]);
      } else {
        setIsHovering(false);
        setCursorTrail([]);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorTrail([]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    heroSection.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      heroSection.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mounted]);

  const currentSpec = specializations[currentSpecialization];
  const CurrentIcon = currentSpec.icon;

  return (
    <section
      id="hero-section"
      className="min-h-screen flex items-center justify-center pt-32 px-4 relative overflow-hidden bg-background transition-colors duration-500"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-green-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>

        {/* Enhanced floating particles */}
        <div className="absolute top-20 left-20 w-3 h-3 bg-blue-400 rounded-full animate-float opacity-60 shadow-lg shadow-blue-400/50"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-purple-400 rounded-full animate-float delay-1000 opacity-40 shadow-lg shadow-purple-400/50"></div>
        <div className="absolute bottom-32 left-40 w-2.5 h-2.5 bg-pink-400 rounded-full animate-float delay-2000 opacity-50 shadow-lg shadow-pink-400/50"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-green-400 rounded-full animate-float delay-3000 opacity-60 shadow-lg shadow-green-400/50"></div>
        <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-float delay-4000 opacity-45 shadow-lg shadow-cyan-400/50"></div>
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-float delay-5000 opacity-55 shadow-lg shadow-yellow-400/50"></div>

        {/* Interactive grid pattern that responds to cursor */}
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] transition-opacity duration-300"
          style={{
            opacity: isHovering ? 0.8 : 0.4,
          }}
        ></div>

        {/* Animated geometric shapes */}
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-blue-400/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 border border-purple-400/20 rotate-12 animate-pulse-slow"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative">
        {/* Enhanced Profile Section with Image */}
        <div className="mb-10 relative">
          <div className="relative w-48 h-48 mx-auto mb-6 group">
            {/* Rotating gradient rings */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin-slow opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div
              className="absolute inset-1 bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-full animate-spin-slow opacity-50 group-hover:opacity-75 transition-opacity duration-500"
              style={{
                animationDirection: "reverse",
                animationDuration: "15s",
              }}
            ></div>
            <div className="absolute inset-3 bg-background rounded-full shadow-2xl"></div>

            {/* Profile Image or Placeholder */}
            <div className="absolute inset-5 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-base font-bold group-hover:scale-105 transition-transform duration-500 overflow-hidden">
              <Image
                src={profileImageUrl || "/placeholder.svg"}
                alt="Made Narayindra"
                width={152}
                height={152}
                className="w-full h-full object-cover rounded-full"
                priority
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.parentElement?.querySelector(
                    ".fallback-content"
                  ) as HTMLElement;
                  if (fallback) fallback.style.display = "block";
                }}
              />
              <div
                className="fallback-content text-center"
                style={{ display: "none" }}
              >
                <div className="text-xl mb-1">👨‍💻</div>
                <div className="text-xs">Made N.</div>
              </div>
            </div>

            {/* Enhanced floating sparkles around profile */}
            <Sparkles
              className="absolute -top-2 -right-2 text-yellow-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              size={18}
            />
            <Sparkles
              className="absolute -bottom-2 -left-2 text-blue-400 animate-pulse delay-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              size={14}
            />
            <Sparkles
              className="absolute top-1/2 -left-4 text-purple-400 animate-pulse delay-1000 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              size={12}
            />
            <Sparkles
              className="absolute top-1/2 -right-4 text-pink-400 animate-pulse delay-1500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              size={10}
            />
          </div>
        </div>

        {/* Enhanced Main Content - Smaller Text */}
        <div className="space-y-6">
          {/* Greeting and Name */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/50 rounded-full border border-border/30 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-muted-foreground">
                Available for new opportunities
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {"Hi, I'm "}
              <span className="relative inline-block group">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_0_15px_rgba(147,51,234,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-all duration-500">
                  Made Narayindra
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </span>
            </h1>

            {/* Dynamic Specialization Display - Smaller */}
            <div className="h-20 flex flex-col items-center justify-center">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2.5 rounded-xl bg-gradient-to-r ${
                    currentSpec.color
                  } shadow-lg transition-all duration-700 ease-out hover:scale-110 ${
                    isTyping ? "scale-100 opacity-100" : "scale-90 opacity-70"
                  }`}
                >
                  <CurrentIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl font-bold">
                  <span
                    className={`bg-gradient-to-r ${
                      currentSpec.color
                    } bg-clip-text text-transparent transition-all duration-700 ease-out ${
                      isTyping ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                  >
                    {currentSpec.text}
                  </span>
                </div>
              </div>
              <p
                className={`text-sm md:text-base text-muted-foreground transition-all duration-700 ease-out ${
                  isTyping
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
              >
                {currentSpec.description}
              </p>
            </div>
          </div>

          {/* Enhanced Description - Smaller */}
          <div className="max-w-2xl mx-auto">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {"Passionate about creating "}
              <span className="text-blue-600 font-semibold drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-all duration-300">
                innovative digital experiences
              </span>
              {
                " and building solutions that make a difference. Currently pursuing my degree in Information Technology with expertise in "
              }
              <span className="text-purple-600 font-semibold drop-shadow-[0_0_8px_rgba(147,51,234,0.3)] hover:drop-shadow-[0_0_12px_rgba(147,51,234,0.5)] transition-all duration-300">
                modern web technologies
              </span>
              .
            </p>
          </div>

          {/* Enhanced Action Buttons - Smaller */}
          <div className="flex flex-wrap justify-center gap-3 pt-6">
            <a
              href="https://github.com/Yindraa"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-900 dark:to-gray-700 text-white dark:text-gray-900 px-6 py-3 rounded-xl hover:scale-105 transition-all duration-500 ease-out shadow-lg hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Github
                size={20}
                className="group-hover:rotate-12 transition-transform duration-500 relative z-10"
              />
              <span className="font-medium relative z-10">GitHub</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>

            <a
              href="https://www.linkedin.com/in/made-narayindra-10aa24244"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-500 ease-out shadow-lg hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Linkedin
                size={20}
                className="group-hover:rotate-12 transition-transform duration-500 relative z-10"
              />
              <span className="font-medium relative z-10">LinkedIn</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>

            <a
              href="mailto:madenarayindra23@gmail.com"
              className="group relative flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-500 ease-out shadow-lg hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-emerald-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Mail
                size={20}
                className="group-hover:rotate-12 transition-transform duration-500 relative z-10"
              />
              <span className="font-medium relative z-10">Email</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>

            <a
              href="/resume.pdf"
              download
              className="group relative flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-500 ease-out shadow-lg hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Download
                size={20}
                className="group-hover:rotate-12 transition-transform duration-500 relative z-10"
              />
              <span className="font-medium relative z-10">Resume</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
          </div>

          {/* Stats Section - Smaller */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-xl mx-auto">
            {[
              { number: "3+", label: "Years Experience" },
              { number: "50+", label: "Projects Completed" },
              { number: "15+", label: "Happy Clients" },
              { number: "100%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl font-bold text-foreground group-hover:scale-110 group-hover:text-blue-600 transition-all duration-500">
                  {stat.number}
                </div>
                <div className="text-xs text-muted-foreground mt-1 group-hover:text-foreground transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">
            Scroll to explore
          </span>
          <div className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center hover:border-muted-foreground/60 transition-colors duration-300">
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full mt-1.5 animate-bounce-slow"></div>
          </div>
          <ArrowDown
            className="text-muted-foreground/50 animate-bounce-slow hover:text-muted-foreground/80 transition-colors duration-300"
            size={16}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
