"use client";

import type React from "react";
import { useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  Sparkles,
  Briefcase,
  Zap,
  Users,
} from "lucide-react";
import { motion, useMotionValue, useTransform, Variants } from "framer-motion";
import DynamicSpecialization from "./components/DynamicSpecialization";
import ProfileImage from "./components/ProfileImage";

// Varian untuk animasi staggered (bertingkat)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const Hero: React.FC = () => {
  const profileImageUrl = "/Indra.jpg";

  // Logika untuk efek 3D pada gambar profil
  const profileRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // PERBAIKAN: Meningkatkan jangkauan rotasi agar lebih terlihat
  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      x.set(event.clientX - rect.left - rect.width / 2);
      y.set(event.clientY - rect.top - rect.height / 2);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="hero-section"
      className="min-h-screen flex items-center justify-center pt-32 px-4 relative overflow-hidden bg-background"
    >
      {/* Elemen Latar Belakang */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <motion.div
        className="max-w-6xl mx-auto text-center relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Bagian Profil dengan Animasi 3D Hover */}
        <motion.div
          variants={itemVariants}
          className="mb-10 relative"
          ref={profileRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1000px" }}
        >
          <motion.div
            className="relative w-48 h-48 mx-auto mb-6 group"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            // PERBAIKAN: Menyesuaikan transisi spring agar lebih responsif
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin-slow opacity-75 group-hover:opacity-100"></div>
            <div
              className="absolute inset-1 bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-full animate-spin-slow opacity-50 group-hover:opacity-75"
              style={{
                animationDirection: "reverse",
                animationDuration: "15s",
              }}
            ></div>
            <div className="absolute inset-3 bg-background rounded-full shadow-2xl"></div>
            <div className="absolute inset-5 bg-muted rounded-full flex items-center justify-center overflow-hidden">
              <ProfileImage src={profileImageUrl} alt="Made Narayindra" />
            </div>
            <Sparkles
              className="absolute -top-2 -right-2 text-yellow-400 animate-pulse opacity-0 group-hover:opacity-100"
              size={18}
              style={{ transform: "translateZ(20px)" }}
            />
            <Sparkles
              className="absolute -bottom-2 -left-2 text-blue-400 animate-pulse delay-500 opacity-0 group-hover:opacity-100"
              size={14}
              style={{ transform: "translateZ(20px)" }}
            />
          </motion.div>
        </motion.div>

        {/* Konten Utama dengan Animasi */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/50 rounded-full border border-border/30 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-muted-foreground">
              Available for new opportunities
            </span>
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mt-4"
        >
          {"Hi, I'm "}
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
            Made Narayindra
          </span>
        </motion.h1>

        <motion.div variants={itemVariants}>
          <DynamicSpecialization />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          {"Passionate about creating "}
          <span className="text-blue-600 font-semibold">
            innovative digital experiences
          </span>
          {" and building solutions that make a difference."}
        </motion.p>

        {/* Tombol Aksi dengan Animasi Hover */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 pt-6"
        >
          <motion.a
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/Yindraa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl shadow-md"
          >
            <Github size={20} />
            <span>GitHub</span>
          </motion.a>
          <motion.a
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.linkedin.com/in/made-narayindra-10aa24244"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl shadow-md"
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </motion.a>
          <motion.a
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:madenarayindra23@gmail.com"
            className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl shadow-md"
          >
            <Mail size={20} />
            <span>Email</span>
          </motion.a>
          <motion.a
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf"
            download
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl shadow-lg"
          >
            <Download size={20} />
            <span>Resume</span>
          </motion.a>
        </motion.div>

        {/* ELEMEN BARU: Statistik Kunci */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-12 max-w-2xl mx-auto"
          variants={containerVariants} // Menggunakan kembali container untuk stagger
        >
          <motion.div
            variants={itemVariants}
            className="text-center bg-accent/30 p-4 rounded-lg"
          >
            <Briefcase className="mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-foreground">3+</div>
            <div className="text-xs text-muted-foreground">
              Years of Experience
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="text-center bg-accent/30 p-4 rounded-lg"
          >
            <Zap className="mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-foreground">50+</div>
            <div className="text-xs text-muted-foreground">
              Projects Completed
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="text-center bg-accent/30 p-4 rounded-lg col-span-2 md:col-span-1"
          >
            <Users className="mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-foreground">15+</div>
            <div className="text-xs text-muted-foreground">Happy Clients</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
