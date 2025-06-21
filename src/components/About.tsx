"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Code2,
  Palette,
  Monitor,
  Globe,
  Coffee,
  Lightbulb,
  Target,
  Rocket,
  Calendar,
  MapPin,
  GraduationCap,
  Award,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";

const About: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Image carousel data - you can replace these with your actual images
  const carouselImages = [
    {
      src: "/placeholder.svg?height=400&width=400&text=Coding+Setup",
      alt: "My coding workspace",
      caption: "My daily coding environment",
    },
    {
      src: "/placeholder.svg?height=400&width=400&text=Project+Work",
      alt: "Working on projects",
      caption: "Building amazing projects",
    },
    {
      src: "/placeholder.svg?height=400&width=400&text=Team+Collaboration",
      alt: "Team collaboration",
      caption: "Collaborating with teams",
    },
    {
      src: "/placeholder.svg?height=400&width=400&text=Learning+Journey",
      alt: "Learning new technologies",
      caption: "Always learning and growing",
    },
    {
      src: "/placeholder.svg?height=400&width=400&text=Achievement",
      alt: "Project achievements",
      caption: "Celebrating milestones",
    },
  ];

  // Interactive skills with progress and icons
  const interactiveSkills = [
    {
      name: "React & Next.js",
      level: 90,
      icon: Code2,
      color: "from-blue-500 to-cyan-500",
      description: "Building modern web applications",
    },
    {
      name: "UI/UX Design",
      level: 85,
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      description: "Creating beautiful user experiences",
    },
    {
      name: "TypeScript",
      level: 80,
      icon: Monitor,
      color: "from-purple-500 to-violet-500",
      description: "Type-safe development",
    },
    {
      name: "Node.js",
      level: 75,
      icon: Globe,
      color: "from-green-500 to-emerald-500",
      description: "Backend development",
    },
    {
      name: "Problem Solving",
      level: 95,
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-500",
      description: "Analytical thinking",
    },
    {
      name: "Project Management",
      level: 70,
      icon: Target,
      color: "from-indigo-500 to-blue-500",
      description: "Leading development teams",
    },
  ];

  // Timeline data
  const timeline = [
    {
      id: "timeline-2025",
      year: "2025",
      title: "Full-Stack Development",
      description: "Building end-to-end web applications",
      icon: Code2,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "timeline-2024",
      year: "2024",
      title: "Desktop App Development",
      description: "Started creating cross-platform desktop applications",
      icon: Monitor,
      color: "from-cyan-500 to-blue-500",
    },
    {
      id: "timeline-2023",
      year: "2023",
      title: "Advanced Web Development",
      description: "Mastering modern frameworks and cloud technologies",
      icon: Rocket,
      color: "from-purple-500 to-pink-500",
    },

    {
      id: "timeline-2022",
      year: "2022",
      title: "Started IT Journey",
      description: "Beginning my studies in Information Technology",
      icon: GraduationCap,
      color: "from-green-500 to-emerald-500",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!mounted || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [mounted, isAutoPlaying, carouselImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (!mounted) {
    return (
      <section
        id="about"
        className="py-20 px-4 bg-muted/30 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded mb-12 mx-auto max-w-xs"></div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
              </div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="about"
      className="py-20 px-4 bg-muted/30 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-green-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16 mt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/50 rounded-full border border-border/30 backdrop-blur-sm mb-6 hover:scale-105 hover:bg-accent/70 transition-all duration-700 ease-out hover:shadow-lg hover:shadow-blue-500/10">
            <Coffee className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              Get to know me better
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
              Me
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {
              "Passionate developer crafting digital experiences with creativity and precision"
            }
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left Column - Story & Info */}
          <div className="space-y-8">
            {/* Story Section */}
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border/20 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.02] hover:bg-card/70 hover:border-border/40 transform-gpu">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 hover:rotate-3 hover:shadow-lg hover:shadow-blue-500/30 transform-gpu">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  My Journey
                </h3>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  {
                    "I'm currently pursuing my Bachelor's degree in Information Technology, with a passion for web development and software engineering. My journey in tech started with curiosity about how websites work, and it has evolved into a deep love for creating digital solutions."
                  }
                </p>
                <p>
                  {
                    "I enjoy working with modern technologies like React, Next.js, and Node.js, and I'm always eager to learn new frameworks and tools that can help me build better applications."
                  }
                </p>
                <p>
                  {
                    "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or working on personal projects that challenge my skills."
                  }
                </p>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/20 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.04] hover:bg-card/70 hover:-translate-y-2 group transform-gpu">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-blue-600 group-hover:rotate-6 group-hover:scale-110 transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform-gpu" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Experience
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground group-hover:text-blue-600 transition-colors duration-500">
                  3+ Years
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/20 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.04] hover:bg-card/70 hover:-translate-y-2 group transform-gpu">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-green-600 group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform-gpu" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Location
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground group-hover:text-green-600 transition-colors duration-500">
                  Indonesia
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/20 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.04] hover:bg-card/70 hover:-translate-y-2 group transform-gpu">
                <div className="flex items-center gap-3 mb-3">
                  <GraduationCap className="w-5 h-5 text-purple-600 group-hover:rotate-6 group-hover:scale-110 transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform-gpu" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Education
                  </span>
                </div>
                <p className="text-lg font-bold text-foreground group-hover:text-purple-600 transition-colors duration-500">
                  IT Student
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/20 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.04] hover:bg-card/70 hover:-translate-y-2 group transform-gpu">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-5 h-5 text-orange-600 group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform-gpu" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Projects
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground group-hover:text-orange-600 transition-colors duration-500">
                  50+
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Image Carousel */}
          <div className="relative">
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/20 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.02] hover:bg-card/70 transform-gpu">
              {/* Carousel Container */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted/50 group">
                {/* Images */}
                <div className="relative w-full h-full">
                  {carouselImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ease-out ${
                        index === currentImageIndex
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105"
                      }`}
                    >
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover rounded-xl transition-transform duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105 transform-gpu"
                        priority={index === 0}
                      />
                      {/* Overlay with caption */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:from-black/40 transform-gpu">
                        <div className="absolute bottom-4 left-4 right-4 transform transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0 translate-y-1 transform-gpu">
                          <p className="text-white font-medium text-lg drop-shadow-lg">
                            {image.caption}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Controls */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform-gpu">
                  <button
                    onClick={prevImage}
                    className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 hover:-translate-x-1 hover:shadow-lg transform-gpu"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 hover:translate-x-1 hover:shadow-lg transform-gpu"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Auto-play control */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform-gpu">
                  <button
                    onClick={toggleAutoPlay}
                    className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 hover:-translate-y-1 hover:shadow-lg transform-gpu"
                    aria-label={
                      isAutoPlaying ? "Pause slideshow" : "Play slideshow"
                    }
                  >
                    {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-110 ${
                      index === currentImageIndex
                        ? "bg-blue-600 w-8 shadow-lg shadow-blue-500/30"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Skills Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Skills & Expertise
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interactiveSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div
                  key={skill.name}
                  className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/20 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03] hover:bg-card/70 hover:-translate-y-3 group cursor-pointer transform-gpu"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-3 bg-gradient-to-r ${skill.color} rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:shadow-lg transform-gpu`}
                      style={{
                        boxShadow:
                          hoveredSkill === skill.name
                            ? `0 8px 25px ${
                                skill.color.includes("blue")
                                  ? "rgba(59, 130, 246, 0.3)"
                                  : skill.color.includes("pink")
                                  ? "rgba(236, 72, 153, 0.3)"
                                  : skill.color.includes("purple")
                                  ? "rgba(147, 51, 234, 0.3)"
                                  : skill.color.includes("green")
                                  ? "rgba(34, 197, 94, 0.3)"
                                  : skill.color.includes("yellow")
                                  ? "rgba(245, 158, 11, 0.3)"
                                  : "rgba(99, 102, 241, 0.3)"
                              }`
                            : "none",
                      }}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-blue-600 transition-colors duration-500">
                        {skill.name}
                      </h4>
                      <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-500">
                        {skill.description}
                      </p>
                    </div>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">
                        Proficiency
                      </span>
                      <span className="text-sm font-bold text-foreground group-hover:text-blue-600 transition-colors duration-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{
                          width: `${skill.level}%`,
                          transform:
                            hoveredSkill === skill.name
                              ? "scaleY(1.3)"
                              : "scaleY(1)",
                          boxShadow:
                            hoveredSkill === skill.name
                              ? `0 0 15px ${
                                  skill.color.includes("blue")
                                    ? "rgba(59, 130, 246, 0.5)"
                                    : skill.color.includes("pink")
                                    ? "rgba(236, 72, 153, 0.5)"
                                    : skill.color.includes("purple")
                                    ? "rgba(147, 51, 234, 0.5)"
                                    : skill.color.includes("green")
                                    ? "rgba(34, 197, 94, 0.5)"
                                    : skill.color.includes("yellow")
                                    ? "rgba(245, 158, 11, 0.5)"
                                    : "rgba(99, 102, 241, 0.5)"
                                }`
                              : "none",
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Section */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            My Timeline
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-8 ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div
                      className={`flex-1 ${
                        index % 2 === 0 ? "text-right" : "text-left"
                      }`}
                    >
                      <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/20 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03] hover:bg-card/70 hover:-translate-y-2 group transform-gpu">
                        <div
                          className={`flex items-center gap-3 mb-3 ${
                            index % 2 === 0 ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`p-2 bg-gradient-to-r ${item.color} rounded-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:shadow-lg transform-gpu`}
                          >
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-2xl font-bold text-blue-600 group-hover:text-purple-600 transition-colors duration-500">
                            {item.year}
                          </span>
                        </div>
                        <h4 className="text-xl font-semibold text-foreground mb-2 group-hover:text-blue-600 transition-colors duration-500">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-500">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="relative z-10">
                      <div className="w-4 h-4 bg-background border-4 border-blue-600 rounded-full transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-125 hover:border-purple-600 hover:shadow-lg hover:shadow-blue-500/30 transform-gpu"></div>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
