// src/app/sections/Projects/components/ProjectImage.tsx

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ImageIcon } from "lucide-react"; // Menggunakan ikon untuk placeholder

interface ProjectImageProps {
  src: string | null | undefined; // Tipe diubah agar lebih fleksibel
  alt: string;
}

const ProjectImage: React.FC<ProjectImageProps> = ({ src, alt }) => {
  const [hasError, setHasError] = useState(false);

  // Cek apakah src valid. Jika tidak, anggap sebagai error.
  const isSrcInvalid = !src || hasError;

  // Reset status error setiap kali 'src' berubah
  useEffect(() => {
    setHasError(false);
  }, [src]);

  // Jika sumber gambar tidak valid, tampilkan placeholder yang lebih baik
  if (isSrcInvalid) {
    return (
      <div className="w-full h-full bg-muted flex flex-col items-center justify-center text-muted-foreground">
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
      className="object-cover"
      onError={() => {
        // Jika terjadi error saat memuat gambar, set state error
        setHasError(true);
      }}
      unoptimized={hasError} // Mencegah Next.js mencoba mengoptimalkan gambar yang error
    />
  );
};

export default ProjectImage;
