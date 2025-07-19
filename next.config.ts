import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**", // Izinkan semua path dari hostname ini
      },
      // Anda bisa menambahkan domain lain di sini di masa depan
      // {
      //   protocol: 'https',
      //   hostname: 'another-domain.com',
      // },
    ],
  },
};

export default nextConfig;
