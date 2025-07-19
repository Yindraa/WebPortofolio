// src/app/sections/Projects/components/ProjectModal.tsx

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Github, ExternalLink, Info, Cpu } from "lucide-react";
import type { Project } from "../../../../types/portofolio";
import ProjectImage from "./ProjectImage";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (project?.galleryImages?.length) {
      setActiveImage(project.galleryImages[0]);
    }
  }, [project]);

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            layoutId={`project-card-${project.id}`}
            className="bg-card w-full max-w-5xl max-h-[90vh] rounded-2xl border border-border shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-6 border-b border-border flex justify-between items-center flex-shrink-0"
            >
              <h2 className="text-2xl font-bold text-foreground">
                {project.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <X />
              </button>
            </motion.div>

            {/* Konten Utama Modal */}
            <div
              className="p-8 overflow-y-auto"
              style={{ scrollbarWidth: "thin" }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                {/* Kolom Kiri: Galeri Gambar */}
                <div className="lg:col-span-3 space-y-4">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative w-full aspect-video rounded-xl overflow-hidden border border-border"
                  >
                    <ProjectImage
                      src={activeImage}
                      alt={`${project.title} active image`}
                    />
                  </motion.div>

                  <div className="grid grid-cols-4 gap-3">
                    {project.galleryImages.map((img, index) => (
                      <motion.div
                        key={index}
                        onClick={() => setActiveImage(img)}
                        className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                          activeImage === img
                            ? "ring-2 ring-primary ring-offset-2 ring-offset-card"
                            : "hover:opacity-80"
                        }`}
                        variants={contentVariants}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                      >
                        <ProjectImage
                          src={img}
                          alt={`${project.title} thumbnail ${index + 1}`}
                        />
                        {activeImage !== img && (
                          <div className="absolute inset-0 bg-black/30"></div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Kolom Kanan: Detail Proyek */}
                <div className="lg:col-span-2 flex flex-col space-y-8">
                  <motion.div
                    custom={0}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Info className="text-primary" size={20} />
                      <h3 className="text-xl font-semibold text-foreground">
                        About Project
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {project.longDescription}
                    </p>
                  </motion.div>

                  <motion.div
                    custom={1}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Cpu className="text-primary" size={20} />
                      <h3 className="text-xl font-semibold text-foreground">
                        Technologies
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Tombol Aksi */}
                  <motion.div
                    custom={2}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border"
                  >
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                      >
                        <ExternalLink size={18} /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 bg-transparent text-foreground border border-border rounded-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors text-center"
                      >
                        <Github size={18} /> View Code
                      </a>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
