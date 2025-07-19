"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import {
  Lightbulb,
  Calendar,
  MapPin,
  GraduationCap,
  Award,
} from "lucide-react";
import ImageCarousel from "./components/ImageCarousel";
import InteractiveSkills from "./components/InteractiveSkills";
import Timeline from "./components/Timeline"; // Impor komponen Timeline yang baru

// Komponen helper untuk animasi scroll-into-view tetap di sini karena digunakan oleh beberapa bagian
const AnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const About: React.FC = () => {
  const factsContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const factItem: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section
      id="about"
      className="py-24 px-4 bg-muted/30 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate developer crafting digital experiences with creativity
            and precision.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-16 items-start mb-24">
          <AnimatedSection className="lg:col-span-3">
            <div className="space-y-8">
              <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    My Journey
                  </h3>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I&apos;m currently pursuing my Bachelor&apos;s degree in
                    Information Technology, with a passion for web development
                    and software engineering. My journey in tech started with
                    curiosity about how websites work, and it has evolved into a
                    deep love for creating digital solutions.
                  </p>
                  <p>
                    I enjoy working with modern technologies like React,
                    Next.js, and Node.js, and I&apos;m always eager to learn new
                    frameworks and tools that can help me build better
                    applications.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Quick Facts
                </h3>
                <motion.div
                  className="grid grid-cols-2 gap-4"
                  variants={factsContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <motion.div
                    variants={factItem}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="bg-card/50 p-6 rounded-xl border border-border/20 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Experience
                      </span>
                    </div>
                    <p className="text-xl font-bold text-foreground">
                      3+ Years
                    </p>
                  </motion.div>
                  <motion.div
                    variants={factItem}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="bg-card/50 p-6 rounded-xl border border-border/20 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Location
                      </span>
                    </div>
                    <p className="text-xl font-bold text-foreground">
                      Indonesia
                    </p>
                  </motion.div>
                  <motion.div
                    variants={factItem}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="bg-card/50 p-6 rounded-xl border border-border/20 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <GraduationCap className="w-5 h-5 text-purple-500" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Education
                      </span>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      IT Student
                    </p>
                  </motion.div>
                  <motion.div
                    variants={factItem}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="bg-card/50 p-6 rounded-xl border border-border/20 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="w-5 h-5 text-orange-500" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Projects
                      </span>
                    </div>
                    <p className="text-xl font-bold text-foreground">50+</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection className="lg:col-span-2">
            <ImageCarousel />
          </AnimatedSection>
        </div>

        <AnimatedSection className="mb-24">
          <InteractiveSkills />
        </AnimatedSection>

        {/* Memanggil komponen Timeline yang sudah dianimasikan */}
        <AnimatedSection>
          <Timeline />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;
