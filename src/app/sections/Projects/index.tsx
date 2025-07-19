// src/app/sections/Projects/index.tsx

"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "./data";
import type { Project } from "../../../types/portofolio";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import { Code2, Plus } from "lucide-react";

const PROJECTS_PER_PAGE = 6; // Jumlah proyek yang ditampilkan per halaman

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // State untuk filter dan "load more"
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  // Memoize kategori unik untuk membuat tombol filter
  const categories = useMemo(() => {
    const allCategories = projects.map((p) => p.category);
    return ["All", ...Array.from(new Set(allCategories))];
  }, []);

  // Memoize proyek yang telah difilter
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + PROJECTS_PER_PAGE);
  };

  const handleFilterChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(PROJECTS_PER_PAGE); // Reset jumlah saat filter berubah
  };

  return (
    <section id="projects" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20 mb-6 font-medium shadow-md">
            <Code2 className="w-4 h-4" />
            <span className="text-sm">My Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore a selection of my work. Use the filters to navigate through
            different categories.
          </p>
        </motion.div>

        {/* Tombol Filter yang Diperbarui */}
        <div className="flex justify-center flex-wrap gap-4 mb-16">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <motion.button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Latar belakang aktif dengan animasi layout */}
                {isActive && (
                  <motion.span
                    layoutId="active-filter-background"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Galeri Proyek */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.slice(0, visibleCount).map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ProjectCard
                  project={project}
                  onCardClick={setSelectedProject}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Tombol Load More */}
        {visibleCount < filteredProjects.length && (
          <div className="text-center mt-16">
            <button
              onClick={handleLoadMore}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-transform duration-200 hover:scale-105"
            >
              <Plus
                className="group-hover:rotate-90 transition-transform duration-300"
                size={18}
              />
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Modal tetap sama */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;
