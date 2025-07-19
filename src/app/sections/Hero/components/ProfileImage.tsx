"use client";

import Image from "next/image";
import type React from "react";

interface ProfileImageProps {
  src: string;
  alt: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ src, alt }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={152}
      height={152}
      className="w-full h-full object-cover rounded-full"
      priority
      onError={(e) => {
        // Fallback ke placeholder jika gambar lokal gagal dimuat
        e.currentTarget.src =
          "https://placehold.co/152x152/374151/ffffff?text=Indra";
      }}
    />
  );
};

export default ProfileImage;
