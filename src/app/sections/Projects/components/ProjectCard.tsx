// src/app/sections/Projects/components/ProjectCard.tsx

"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "../../../../types/portofolio";
import ProjectImage from "./ProjectImage";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onCardClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onCardClick }) => {
  const ref = useRef<HTMLDivElement>(null);

  // Untuk efek 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    // PERBAIKAN: Hapus 'width' dan 'height' karena tidak digunakan
    const { left, top } = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Transformasi rotasi
  const rotateX = useSpring(useTransform(mouseY, [0, 300], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 500], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onCardClick(project)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative cursor-pointer rounded-2xl overflow-hidden bg-card border border-border/50 shadow-lg group"
    >
      <div
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="p-6"
      >
        <div className="relative w-full aspect-video overflow-hidden rounded-lg border-2 border-border/60">
          <ProjectImage src={project.imageUrl} alt={project.title} />
        </div>
        <div className="pt-6">
          <h3 className="text-xl font-bold text-foreground mb-2">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Project <ArrowRight size={16} className="ml-1" />
          </div>
        </div>
      </div>

      {/* Efek Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            mouseX,
            (val) =>
              `radial-gradient(400px at ${val}px ${mouseY.get()}px, rgba(255, 255, 255, 0.05), transparent 80%)`
          ),
        }}
      />
    </motion.div>
  );
};

export default ProjectCard;
