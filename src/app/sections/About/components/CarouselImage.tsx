// src/app/sections/About/components/CarouselImage.tsx (atau path yang sesuai)

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ImageIcon } from "lucide-react";
import type React from "react";

interface CarouselImageProps {
  src: string | null | undefined; // Tipe diubah agar lebih fleksibel
  alt: string;
  priority: boolean;
}

const CarouselImage: React.FC<CarouselImageProps> = ({
  src,
  alt,
  priority,
}) => {
  const [hasError, setHasError] = useState(false);

  // Cek apakah src valid. Jika tidak, anggap sebagai error.
  const isSrcInvalid = !src || hasError;

  // Reset status error setiap kali 'src' berubah
  useEffect(() => {
    setHasError(false);
  }, [src]);

  // Jika sumber gambar tidak valid, tampilkan placeholder
  if (isSrcInvalid) {
    return (
      <div className="w-full h-full bg-muted flex flex-col items-center justify-center text-muted-foreground rounded-xl">
        <ImageIcon size={48} className="mb-2" />
        <p className="text-sm font-medium">Image not available</p>
      </div>
    );
  }

  // Jika sumber gambar valid, tampilkan komponen Image dari Next.js
  return (
    <Image
      src={src} // src dijamin valid di sini
      alt={alt}
      fill
      className="object-cover rounded-xl transition-transform duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105 transform-gpu"
      priority={priority}
      onError={() => {
        // Jika terjadi error saat memuat gambar, set state error
        setHasError(true);
      }}
      unoptimized={hasError}
    />
  );
};

export default CarouselImage;
