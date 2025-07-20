"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  motion,
  useSpring,
  AnimatePresence,
  type Variants,
} from "framer-motion";

const GlobalCursor: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 1200, damping: 60 });
  const cursorY = useSpring(-100, { stiffness: 1200, damping: 60 });
  const followerX = useSpring(-100, { stiffness: 200, damping: 20 });
  const followerY = useSpring(-100, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (!isMobile) {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      // FIX: Check if we're over the hero section and skip cursor updates
      const target = e.target as HTMLElement;
      const heroSection = document.getElementById("hero");

      if (heroSection && heroSection.contains(target)) {
        // Don't interfere with hero section interactions
        return;
      }

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const heroSection = document.getElementById("hero");

      // FIX: Don't interfere with hero section
      if (heroSection && heroSection.contains(target)) {
        return;
      }

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest(".cursor-pointer")
      ) {
        setIsPointer(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const heroSection = document.getElementById("hero");

      // FIX: Don't interfere with hero section
      if (heroSection && heroSection.contains(target)) {
        return;
      }

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest(".cursor-pointer")
      ) {
        setIsPointer(false);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // FIX: Use passive listeners to avoid blocking
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMounted, cursorX, cursorY, followerX, followerY]);

  if (!isMounted) {
    return null;
  }

  const followerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (isPointer) => ({
      opacity: 1,
      scale: 1,
      width: isPointer ? 40 : 32,
      height: isPointer ? 40 : 32,
      backgroundColor: isPointer
        ? "hsla(var(--primary), 0.2)"
        : "hsla(var(--primary), 0.1)",
      border: isPointer
        ? "2px solid hsla(var(--primary), 0.4)"
        : "1px solid hsla(var(--primary), 0.2)",
      transition: { type: "spring", stiffness: 200, damping: 20 },
    }),
  };

  const cursorVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 1200, damping: 60 },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            variants={followerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            custom={isPointer}
            // FIX: Lower z-index and ensure pointer events are disabled
            className="fixed z-40 pointer-events-none rounded-full"
            style={{
              x: followerX,
              y: followerY,
              left: isPointer ? -20 : -16,
              top: isPointer ? -20 : -16,
              pointerEvents: "none", // Explicitly disable
            }}
          />
          <motion.div
            variants={cursorVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            // FIX: Lower z-index and ensure pointer events are disabled
            className="fixed w-2 h-2 z-40 pointer-events-none rounded-full bg-primary"
            style={{
              x: cursorX,
              y: cursorY,
              left: -4,
              top: -4,
              pointerEvents: "none", // Explicitly disable
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default GlobalCursor;
