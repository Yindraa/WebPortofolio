// src/app/not-found.tsx

"use client";

import Link from "next/link";
import { Home, Compass } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

export default function NotFound() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-200, 200], [10, -10]);
  const rotateY = useTransform(x, [-200, 200], [-10, 10]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      x.set(event.clientX - rect.left - rect.width / 2);
      y.set(event.clientY - rect.top - rect.height / 2);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Latar Belakang Animasi */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <motion.div
        className="text-center flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Teks 404 dengan Efek 3D */}
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1000px" }}
          className="mb-6"
        >
          <motion.h1
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="text-8xl md:text-9xl font-black bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            <span style={{ transform: "translateZ(20px)" }}>4</span>
            <span style={{ transform: "translateZ(40px)" }}>0</span>
            <span style={{ transform: "translateZ(20px)" }}>4</span>
          </motion.h1>
        </motion.div>

        <div className="flex items-center gap-3 mb-4 p-3 bg-accent/50 rounded-xl border border-border/30 backdrop-blur-sm">
          <Compass className="text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Lost in Cyberspace
          </h2>
        </div>

        <p className="text-muted-foreground max-w-md mb-8">
          It seems you&apos;ve ventured into uncharted territory. The page
          you&apos;re looking for might have been moved or never existed.
        </p>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30"
          >
            <Home size={20} />
            Return to Home Base
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
