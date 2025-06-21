"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

interface CursorTrail {
  x: number;
  y: number;
  id: number;
}

const GlobalCursor: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState<CursorTrail[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const trailIdRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global cursor tracking and trail effect
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Add new trail point
      const newTrail: CursorTrail = {
        x: e.clientX,
        y: e.clientY,
        id: trailIdRef.current++,
      };

      setCursorTrail((prev) => [...prev.slice(-12), newTrail]); // Increased trail length for global effect
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCursorTrail([]);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mounted]);

  // Don't render on mobile devices
  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (isMobile) {
      setIsVisible(false);
    }
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <>
      {/* Main cursor glow */}
      <div
        className="fixed pointer-events-none z-50 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-sm transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: `scale(${isVisible ? 1 : 0})`,
        }}
      />

      {/* Cursor trail particles */}
      {cursorTrail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-40 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400/60 to-purple-400/60"
          style={{
            left: point.x - 3,
            top: point.y - 3,
            transform: `scale(${(index + 1) / cursorTrail.length})`,
            opacity: ((index + 1) / cursorTrail.length) * 0.6,
            transition: "all 0.4s ease-out",
          }}
        />
      ))}

      {/* Floating sparkles around cursor - More subtle for global use */}
      <div
        className="fixed pointer-events-none z-30 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      >
        <Sparkles
          className="absolute text-yellow-400/40 animate-pulse opacity-40"
          size={8}
          style={{
            transform: "translate(-15px, -15px) rotate(45deg)",
            animationDelay: "0ms",
          }}
        />
        <Sparkles
          className="absolute text-blue-400/40 animate-pulse opacity-30"
          size={6}
          style={{
            transform: "translate(12px, -18px) rotate(-30deg)",
            animationDelay: "800ms",
          }}
        />
        <Sparkles
          className="absolute text-purple-400/40 animate-pulse opacity-25"
          size={7}
          style={{
            transform: "translate(-12px, 15px) rotate(60deg)",
            animationDelay: "1600ms",
          }}
        />
      </div>

      {/* Enhanced cursor glow on interactive elements */}
      <style jsx global>{`
        button:hover ~ div[style*="z-50"],
        a:hover ~ div[style*="z-50"],
        [role="button"]:hover ~ div[style*="z-50"],
        .cursor-pointer:hover ~ div[style*="z-50"] {
          background: linear-gradient(
            45deg,
            rgba(59, 130, 246, 0.4),
            rgba(147, 51, 234, 0.4)
          );
          transform: scale(1.5);
        }
      `}</style>
    </>
  );
};

export default GlobalCursor;
