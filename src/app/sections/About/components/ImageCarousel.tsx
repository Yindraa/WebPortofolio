"use client";

import React, { useState, useEffect, useCallback } from "react"; // 1. Impor useCallback
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { carouselImages } from "../data";
import CarouselImage from "./CarouselImage";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const ImageCarousel: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const imageIndex = page % carouselImages.length;

  // 2. Bungkus paginate dengan useCallback agar fungsinya stabil
  const paginate = useCallback((newDirection: number) => {
    // Menggunakan functional update agar tidak bergantung pada 'page'
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, paginate]); // 3. Tambahkan paginate ke dependency array

  const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying);

  return (
    <motion.div
      className="relative bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/20"
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 300 },
      }}
    >
      <div className="relative aspect-square rounded-xl overflow-hidden bg-muted/50 group">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full h-full"
          >
            <CarouselImage
              src={carouselImages[imageIndex].src}
              alt={carouselImages[imageIndex].alt}
              priority={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl">
              <p className="absolute bottom-4 left-4 text-white font-medium text-lg drop-shadow-lg">
                {carouselImages[imageIndex].caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Kontrol Navigasi */}
        <div className="absolute inset-0 flex items-center justify-between p-4 z-10">
          <motion.button
            onClick={() => paginate(-1)}
            className="p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            onClick={() => paginate(1)}
            className="p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Kontrol Auto-play */}
        <div className="absolute top-4 right-4 z-10">
          <motion.button
            onClick={toggleAutoPlay}
            className="p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
          </motion.button>
        </div>
      </div>

      {/* Indikator Titik */}
      <div className="flex justify-center gap-2 mt-4">
        {carouselImages.map((_, i) => (
          <button
            key={i}
            onClick={() =>
              setPage(([prevPage]) => [
                i,
                i > prevPage % carouselImages.length ? 1 : -1,
              ])
            }
            className={`h-2 rounded-full transition-all duration-300 ${
              i === imageIndex
                ? "bg-primary w-6"
                : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ImageCarousel;
