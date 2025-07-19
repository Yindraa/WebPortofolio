"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import {
  skillCategoriesData,
  skillsData,
  getLevelColor,
  getLevelProgress,
} from "../data";
import type { SkillCategory } from "../data";
import { Search, ChevronDown, TrendingUp, Award } from "lucide-react";

const SkillsInteractive: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"level" | "experience" | "name">(
    "level"
  );
  const [showOnlyLearning, setShowOnlyLearning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatedCategories: SkillCategory[] = useMemo(
    () =>
      skillCategoriesData.map((category) => ({
        ...category,
        count:
          category.id === "all"
            ? skillsData.length
            : skillsData.filter(
                (skill) => skill.category.toLowerCase() === category.id
              ).length,
      })),
    []
  );

  const filteredSkills = useMemo(
    () =>
      skillsData
        .filter((skill) => {
          const matchesCategory =
            selectedCategory === "all" ||
            skill.category.toLowerCase() === selectedCategory;
          const matchesSearch =
            skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            skill.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            skill.tools.some((tool) =>
              tool.toLowerCase().includes(searchTerm.toLowerCase())
            );
          const matchesLearning = !showOnlyLearning || skill.learning;
          return matchesCategory && matchesSearch && matchesLearning;
        })
        .sort((a, b) => {
          switch (sortBy) {
            case "level":
              const levelOrder = { Advanced: 3, Intermediate: 2, Beginner: 1 };
              return (
                levelOrder[b.level as keyof typeof levelOrder] -
                levelOrder[a.level as keyof typeof levelOrder]
              );
            case "experience":
              const experienceA = parseInt(
                a.experience.match(/\d+/)?.[0] || "0"
              );
              const experienceB = parseInt(
                b.experience.match(/\d+/)?.[0] || "0"
              );
              return experienceB - experienceA;
            case "name":
              return a.name.localeCompare(b.name);
            default:
              return 0;
          }
        }),
    [selectedCategory, searchTerm, sortBy, showOnlyLearning]
  );

  const containerVariants: Variants = {
    visible: {
      transition: { staggerChildren: 0.05 },
    },
    hidden: {},
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
    exit: { y: -20, opacity: 0 },
  };

  const animationKey = `${selectedCategory}-${sortBy}-${showOnlyLearning}-${searchTerm}`;

  if (!mounted) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-muted rounded-full mb-12 mx-auto max-w-lg"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="mb-12 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-wrap justify-center gap-3">
          {updatedCategories.map((category) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.id;
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: isSelected ? 1.05 : 1 }}
                className={`group relative flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-medium transition-colors duration-300 ${
                  isSelected
                    ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg shadow-primary/20`
                    : "bg-card hover:bg-accent border-border text-foreground/80"
                }`}
              >
                <IconComponent size={18} />
                <span>{category.name}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {category.count}
                </span>
              </motion.button>
            );
          })}
        </div>
        <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search skills, tools, or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-card border-2 border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground placeholder-muted-foreground shadow-sm"
            />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "level" | "experience" | "name")
              }
              className="appearance-none w-full md:w-auto bg-card border-2 border-border rounded-xl px-4 py-4 pr-12 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-foreground cursor-pointer shadow-sm font-medium"
            >
              <option value="level">Sort by Level</option>
              <option value="experience">Sort by Experience</option>
              <option value="name">Sort by Name</option>
            </select>
            <ChevronDown
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={20}
            />
          </div>
          <button
            onClick={() => setShowOnlyLearning(!showOnlyLearning)}
            className={`flex items-center gap-2 px-6 py-4 rounded-xl border-2 font-medium transition-all ${
              showOnlyLearning
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-lg"
                : "bg-card hover:bg-accent border-border text-foreground/80 shadow-sm"
            }`}
          >
            <TrendingUp size={20} />
            <span>Learning</span>
          </button>
        </div>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={animationKey}
      >
        {filteredSkills.map((skill) => {
          const IconComponent = skill.icon;
          return (
            <motion.div
              key={skill.id}
              variants={itemVariants}
              layout
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="group bg-card p-8 rounded-2xl border-2 border-border shadow-lg cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-4 bg-gradient-to-r ${skill.color} rounded-2xl shadow-lg`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-foreground">
                      {skill.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(
                          skill.level
                        )}`}
                      >
                        {skill.level}
                      </span>
                      {skill.learning && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-orange-400/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300 rounded-full border border-orange-400/20 dark:border-orange-500/30">
                          <TrendingUp size={14} />
                          <span className="text-xs font-medium">Learning</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {skill.certification && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-green-400/10 text-green-700 dark:bg-green-500/20 dark:text-green-300 rounded-full border border-green-400/20 dark:border-green-500/30">
                    <Award size={16} />
                    <span className="text-xs font-medium">Certified</span>
                  </div>
                )}
              </div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Proficiency
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {getLevelProgress(skill.level)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    style={{ width: `${getLevelProgress(skill.level)}%` }}
                  />
                </div>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {skill.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
};

export default SkillsInteractive;
