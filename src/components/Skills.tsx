"use client";

import type React from "react";
import { useState, useEffect } from "react";
import type { Skill } from "../types/portofolio";
import {
  Code2,
  Palette,
  Database,
  Settings,
  Globe,
  Smartphone,
  Monitor,
  Cloud,
  GitBranch,
  Terminal,
  Layers,
  Zap,
  Trophy,
  TrendingUp,
  Search,
  ChevronDown,
  Clock,
  Target,
  Rocket,
  Award,
  BookOpen,
  Users,
  Star,
} from "lucide-react";

interface ExtendedSkill extends Skill {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  experience: string;
  projects: number;
  learning: boolean;
  certification?: string;
  description: string;
  tools: string[];
  relatedSkills: string[];
}

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  description: string;
  count: number;
}

const Skills: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"level" | "experience" | "name">(
    "level"
  );
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [showOnlyLearning, setShowOnlyLearning] = useState(false);

  const skillCategories: SkillCategory[] = [
    {
      id: "all",
      name: "All Skills",
      icon: Layers,
      color: "from-slate-600 to-slate-700",
      description: "Complete overview of all my technical skills",
      count: 0,
    },
    {
      id: "frontend",
      name: "Frontend",
      icon: Monitor,
      color: "from-blue-600 to-blue-700",
      description: "User interface and experience technologies",
      count: 0,
    },
    {
      id: "backend",
      name: "Backend",
      icon: Database,
      color: "from-emerald-600 to-emerald-700",
      description: "Server-side development and APIs",
      count: 0,
    },
    {
      id: "mobile",
      name: "Mobile",
      icon: Smartphone,
      color: "from-purple-600 to-purple-700",
      description: "Mobile application development",
      count: 0,
    },
    {
      id: "design",
      name: "Design",
      icon: Palette,
      color: "from-pink-600 to-pink-700",
      description: "UI/UX design and visual creativity",
      count: 0,
    },
    {
      id: "tools",
      name: "Tools",
      icon: Settings,
      color: "from-orange-600 to-orange-700",
      description: "Development tools and productivity software",
      count: 0,
    },
    {
      id: "cloud",
      name: "Cloud",
      icon: Cloud,
      color: "from-indigo-600 to-indigo-700",
      description: "Cloud platforms and deployment",
      count: 0,
    },
  ];

  const skills: ExtendedSkill[] = [
    // Frontend Skills
    {
      id: "react",
      name: "React",
      level: "Advanced",
      category: "Frontend",
      icon: Code2,
      color: "from-blue-500 to-cyan-500",
      experience: "3+ years",
      projects: 25,
      learning: false,
      certification: "React Developer Certification",
      description:
        "Building modern, interactive user interfaces with React ecosystem",
      tools: ["Create React App", "Vite", "Next.js", "React Router"],
      relatedSkills: ["JavaScript", "TypeScript", "JSX"],
    },
    {
      id: "nextjs",
      name: "Next.js",
      level: "Advanced",
      category: "Frontend",
      icon: Globe,
      color: "from-gray-800 to-gray-600",
      experience: "2+ years",
      projects: 15,
      learning: false,
      description: "Full-stack React framework for production applications",
      tools: ["App Router", "API Routes", "Server Components", "Vercel"],
      relatedSkills: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "typescript",
      name: "TypeScript",
      level: "Advanced",
      category: "Frontend",
      icon: Code2,
      color: "from-blue-600 to-blue-800",
      experience: "2+ years",
      projects: 20,
      learning: false,
      description: "Type-safe JavaScript development for scalable applications",
      tools: ["TSC", "ESLint", "Prettier", "VS Code"],
      relatedSkills: ["JavaScript", "React", "Node.js"],
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      level: "Advanced",
      category: "Frontend",
      icon: Palette,
      color: "from-cyan-500 to-blue-500",
      experience: "2+ years",
      projects: 30,
      learning: false,
      description: "Utility-first CSS framework for rapid UI development",
      tools: ["Tailwind CLI", "PostCSS", "Headless UI", "Tailwind UI"],
      relatedSkills: ["CSS", "HTML", "React"],
    },
    {
      id: "javascript",
      name: "JavaScript",
      level: "Advanced",
      category: "Frontend",
      icon: Code2,
      color: "from-yellow-500 to-orange-500",
      experience: "4+ years",
      projects: 40,
      learning: false,
      description: "Core programming language for web development",
      tools: ["ES6+", "Babel", "Webpack", "Node.js"],
      relatedSkills: ["TypeScript", "React", "Node.js"],
    },

    // Backend Skills
    {
      id: "nodejs",
      name: "Node.js",
      level: "Intermediate",
      category: "Backend",
      icon: Terminal,
      color: "from-green-600 to-green-800",
      experience: "2+ years",
      projects: 12,
      learning: true,
      description: "Server-side JavaScript runtime for scalable applications",
      tools: ["Express.js", "Fastify", "PM2", "NPM"],
      relatedSkills: ["JavaScript", "TypeScript", "MongoDB"],
    },
    {
      id: "python",
      name: "Python",
      level: "Intermediate",
      category: "Backend",
      icon: Code2,
      color: "from-blue-500 to-yellow-500",
      experience: "2+ years",
      projects: 8,
      learning: true,
      description: "Versatile programming language for backend and automation",
      tools: ["Django", "Flask", "FastAPI", "Pandas"],
      relatedSkills: ["APIs", "Database", "Machine Learning"],
    },
    {
      id: "mongodb",
      name: "MongoDB",
      level: "Intermediate",
      category: "Backend",
      icon: Database,
      color: "from-green-500 to-green-700",
      experience: "1+ years",
      projects: 10,
      learning: false,
      description: "NoSQL database for flexible, scalable data storage",
      tools: ["Mongoose", "MongoDB Atlas", "Compass", "Aggregation"],
      relatedSkills: ["Node.js", "Express.js", "APIs"],
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      level: "Beginner",
      category: "Backend",
      icon: Database,
      color: "from-blue-600 to-indigo-600",
      experience: "6 months",
      projects: 3,
      learning: true,
      description: "Advanced relational database management system",
      tools: ["pgAdmin", "Prisma", "Supabase", "SQL"],
      relatedSkills: ["SQL", "Database Design", "APIs"],
    },

    // Mobile Skills
    {
      id: "react-native",
      name: "React Native",
      level: "Intermediate",
      category: "Mobile",
      icon: Smartphone,
      color: "from-blue-500 to-purple-500",
      experience: "1+ years",
      projects: 5,
      learning: true,
      description: "Cross-platform mobile app development with React",
      tools: ["Expo", "Metro", "React Navigation", "AsyncStorage"],
      relatedSkills: ["React", "JavaScript", "Mobile UI"],
    },
    {
      id: "flutter",
      name: "Flutter",
      level: "Beginner",
      category: "Mobile",
      icon: Smartphone,
      color: "from-blue-400 to-cyan-400",
      experience: "6 months",
      projects: 2,
      learning: true,
      description: "Google's UI toolkit for cross-platform applications",
      tools: ["Dart", "Android Studio", "VS Code", "Firebase"],
      relatedSkills: ["Dart", "Mobile UI", "State Management"],
    },

    // Design Skills
    {
      id: "figma",
      name: "Figma",
      level: "Advanced",
      category: "Design",
      icon: Palette,
      color: "from-purple-500 to-pink-500",
      experience: "3+ years",
      projects: 35,
      learning: false,
      certification: "Figma Professional",
      description: "Collaborative design tool for UI/UX and prototyping",
      tools: ["Auto Layout", "Components", "Prototyping", "Design Systems"],
      relatedSkills: ["UI Design", "UX Design", "Prototyping"],
    },
    {
      id: "adobe-xd",
      name: "Adobe XD",
      level: "Intermediate",
      category: "Design",
      icon: Palette,
      color: "from-pink-500 to-purple-500",
      experience: "2+ years",
      projects: 15,
      learning: false,
      description: "Vector-based design tool for web and mobile interfaces",
      tools: ["Prototyping", "Voice Prototyping", "Plugins", "Creative Cloud"],
      relatedSkills: ["UI Design", "Prototyping", "Adobe Creative Suite"],
    },

    // Tools
    {
      id: "git",
      name: "Git",
      level: "Advanced",
      category: "Tools",
      icon: GitBranch,
      color: "from-orange-500 to-red-500",
      experience: "3+ years",
      projects: 50,
      learning: false,
      description: "Version control system for tracking code changes",
      tools: ["GitHub", "GitLab", "Bitbucket", "Git CLI"],
      relatedSkills: ["GitHub", "Version Control", "Collaboration"],
    },
    {
      id: "vscode",
      name: "VS Code",
      level: "Advanced",
      category: "Tools",
      icon: Code2,
      color: "from-blue-600 to-blue-800",
      experience: "4+ years",
      projects: 100,
      learning: false,
      description: "Powerful code editor with extensive customization",
      tools: ["Extensions", "Debugging", "Git Integration", "IntelliSense"],
      relatedSkills: ["Development", "Debugging", "Extensions"],
    },

    // Cloud
    {
      id: "vercel",
      name: "Vercel",
      level: "Intermediate",
      category: "Cloud",
      icon: Cloud,
      color: "from-gray-800 to-black",
      experience: "2+ years",
      projects: 20,
      learning: false,
      description: "Platform for frontend deployment and serverless functions",
      tools: ["Vercel CLI", "Analytics", "Edge Functions", "Domains"],
      relatedSkills: ["Next.js", "Deployment", "Serverless"],
    },
    {
      id: "netlify",
      name: "Netlify",
      level: "Intermediate",
      category: "Cloud",
      icon: Cloud,
      color: "from-teal-500 to-cyan-500",
      experience: "1+ years",
      projects: 15,
      learning: false,
      description: "Platform for web development with continuous deployment",
      tools: ["Netlify CLI", "Forms", "Functions", "Identity"],
      relatedSkills: ["JAMstack", "Deployment", "Static Sites"],
    },
  ];

  // Update category counts
  const updatedCategories = skillCategories.map((category) => ({
    ...category,
    count:
      category.id === "all"
        ? skills.length
        : skills.filter((skill) => skill.category.toLowerCase() === category.id)
            .length,
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter and sort skills
  const filteredSkills = skills
    .filter((skill) => {
      const matchesCategory =
        selectedCategory === "all" ||
        skill.category.toLowerCase() === selectedCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          return Number.parseInt(b.experience) - Number.parseInt(a.experience);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const getLevelColor = (level: Skill["level"]): string => {
    switch (level) {
      case "Beginner":
        return "bg-amber-500 text-white";
      case "Intermediate":
        return "bg-blue-500 text-white";
      case "Advanced":
        return "bg-emerald-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getLevelProgress = (level: Skill["level"]): number => {
    switch (level) {
      case "Beginner":
        return 30;
      case "Intermediate":
        return 70;
      case "Advanced":
        return 95;
      default:
        return 0;
    }
  };

  if (!mounted) {
    return (
      <section
        id="skills"
        className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-12 mx-auto max-w-xs"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills"
      className="py-24 px-4 bg-white dark:bg-gray-900 transition-colors duration-300 relative"
    >
      {/* Clean background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-950/10 dark:to-purple-950/10"></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Clean Header - FIXED CONTRAST */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full border border-blue-700 mb-6 font-medium shadow-lg">
            <Zap className="w-4 h-4" />
            <span className="text-sm">Technical Expertise</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive overview of my technical skills, tools, and
            technologies I work with to create amazing digital experiences
          </p>
        </div>

        {/* Enhanced Controls with Better Contrast */}
        <div className="mb-12 space-y-6">
          {/* Category Filter - Redesigned */}
          <div className="flex flex-wrap justify-center gap-3">
            {updatedCategories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative flex items-center gap-2 px-5 py-3 rounded-xl border-2 font-medium transition-all duration-300 hover:scale-105 ${
                    isSelected
                      ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg shadow-blue-500/25`
                      : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500 shadow-sm hover:shadow-md"
                  }`}
                >
                  <IconComponent
                    size={18}
                    className="group-hover:rotate-6 transition-transform duration-300"
                  />
                  <span>{category.name}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search and Sort Controls - Better Contrast */}
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            {/* Search */}
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
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "level" | "experience" | "name")
                }
                className="appearance-none bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl px-4 py-4 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-900 dark:text-white cursor-pointer shadow-sm font-medium"
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

            {/* Learning Filter */}
            <button
              onClick={() => setShowOnlyLearning(!showOnlyLearning)}
              className={`flex items-center gap-2 px-6 py-4 rounded-xl border-2 font-medium transition-all duration-300 hover:scale-105 ${
                showOnlyLearning
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-lg"
                  : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md"
              }`}
            >
              <TrendingUp size={20} />
              <span>Learning</span>
            </button>
          </div>
        </div>

        {/* Skills Grid - FIXED CONTRAST ISSUES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredSkills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={skill.id}
                className="group bg-white dark:bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer"
                onMouseEnter={() => setHoveredSkill(skill.id)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-4 bg-gradient-to-r ${skill.color} rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
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
                          <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full border border-orange-200 dark:border-orange-800">
                            <TrendingUp size={14} />
                            <span className="text-xs font-medium">
                              Learning
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {skill.certification && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
                      <Award size={16} />
                      <span className="text-xs font-medium">Certified</span>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Proficiency
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {getLevelProgress(skill.level)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                      style={{
                        width: `${getLevelProgress(skill.level)}%`,
                        transform:
                          hoveredSkill === skill.id
                            ? "scaleY(1.2)"
                            : "scaleY(1)",
                      }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {skill.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Clock size={16} className="text-blue-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {skill.experience}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Target size={16} className="text-green-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {skill.projects} projects
                    </span>
                  </div>
                </div>

                {/* Tools - FIXED CONTRAST */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Settings size={16} />
                    Tools & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.tools.slice(0, 4).map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-colors duration-200"
                      >
                        {tool}
                      </span>
                    ))}
                    {skill.tools.length > 4 && (
                      <span className="px-3 py-1 bg-gray-600 text-white text-sm rounded-lg font-medium">
                        +{skill.tools.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Related Skills - FIXED CONTRAST */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Star size={16} />
                    Related Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.relatedSkills
                      .slice(0, 3)
                      .map((relatedSkill, relatedIndex) => (
                        <span
                          key={relatedIndex}
                          className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg font-medium shadow-sm hover:bg-purple-700 transition-colors duration-200"
                        >
                          {relatedSkill}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Skills Summary - Better Contrast */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-yellow-300 dark:hover:border-yellow-600 shadow-lg hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 hover:scale-105 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl group-hover:rotate-6 transition-transform duration-500">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Advanced Skills
              </span>
            </div>
            <p className="text-4xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors duration-500">
              {skills.filter((skill) => skill.level === "Advanced").length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 shadow-lg hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:scale-105 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform duration-500">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Currently Learning
              </span>
            </div>
            <p className="text-4xl font-bold text-gray-900 dark:text-white group-hover:text-green-500 transition-colors duration-500">
              {skills.filter((skill) => skill.learning).length}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-105 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl group-hover:rotate-12 transition-transform duration-500">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Total Projects
              </span>
            </div>
            <p className="text-4xl font-bold text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors duration-500">
              {skills.reduce((total, skill) => total + skill.projects, 0)}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:scale-105 group">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl group-hover:scale-110 transition-transform duration-500">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Certifications
              </span>
            </div>
            <p className="text-4xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors duration-500">
              {skills.filter((skill) => skill.certification).length}
            </p>
          </div>
        </div>

        {/* Learning Journey - Enhanced */}
        <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full border border-purple-700 mb-6 font-medium shadow-lg">
              <Rocket className="w-4 h-4" />
              <span className="text-sm">Continuous Learning</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              My Learning Philosophy
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Technology evolves rapidly, and I believe in continuous learning
              to stay current with the latest trends and best practices in
              software development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Learn
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Constantly exploring new technologies and frameworks
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                <Code2 className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                Practice
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Building projects to apply and reinforce new skills
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                Share
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                Contributing to the community and helping others learn
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
