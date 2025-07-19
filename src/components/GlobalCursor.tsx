"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion, useSpring, AnimatePresence, Variants } from "framer-motion";

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
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
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

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
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
            // PERBAIKAN: z-index ditingkatkan
            className="fixed z-[9999] pointer-events-none rounded-full"
            style={{
              x: followerX,
              y: followerY,
              left: isPointer ? -20 : -16,
              top: isPointer ? -20 : -16,
            }}
          />
          <motion.div
            variants={cursorVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            // PERBAIKAN: z-index ditingkatkan
            className="fixed w-2 h-2 z-[9999] pointer-events-none rounded-full bg-primary"
            style={{
              x: cursorX,
              y: cursorY,
              left: -4,
              top: -4,
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default GlobalCursor;
