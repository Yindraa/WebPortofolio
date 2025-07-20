// src/app/sections/About/data.ts

import { Code2, Palette, Monitor, Rocket, GraduationCap } from "lucide-react";

export const carouselImages = [
  {
    src: null,
    alt: "My coding workspace",
    caption: "My daily coding environment",
  },
  {
    src: null,
    alt: "Working on projects",
    caption: "Building amazing projects",
  },
  {
    src: null,
    alt: "Team collaboration",
    caption: "Collaborating with teams",
  },
];

export const interactiveSkills = [
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
];

export const timelineData = [
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
