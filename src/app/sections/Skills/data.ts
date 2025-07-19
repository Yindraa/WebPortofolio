import type React from "react";
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
} from "lucide-react";
import type { Skill } from "../../../types/portofolio"; // Sesuaikan path jika perlu

// PERBAIKAN: Ekspor kembali tipe 'Skill' agar bisa diimpor oleh file lain.
export type { Skill };

// Tipe data yang diperluas untuk skill
export interface ExtendedSkill extends Skill {
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

// Tipe data untuk kategori skill
export interface SkillCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  description: string;
  count: number;
}

// Data Kategori
export const skillCategoriesData: Omit<SkillCategory, "count">[] = [
  {
    id: "all",
    name: "All Skills",
    icon: Layers,
    color: "from-slate-600 to-slate-700",
    description: "Complete overview of all my technical skills",
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: Monitor,
    color: "from-blue-600 to-blue-700",
    description: "User interface and experience technologies",
  },
  {
    id: "backend",
    name: "Backend",
    icon: Database,
    color: "from-emerald-600 to-emerald-700",
    description: "Server-side development and APIs",
  },
  {
    id: "mobile",
    name: "Mobile",
    icon: Smartphone,
    color: "from-purple-600 to-purple-700",
    description: "Mobile application development",
  },
  {
    id: "design",
    name: "Design",
    icon: Palette,
    color: "from-pink-600 to-pink-700",
    description: "UI/UX design and visual creativity",
  },
  {
    id: "tools",
    name: "Tools",
    icon: Settings,
    color: "from-orange-600 to-orange-700",
    description: "Development tools and productivity software",
  },
  {
    id: "cloud",
    name: "Cloud",
    icon: Cloud,
    color: "from-indigo-600 to-indigo-700",
    description: "Cloud platforms and deployment",
  },
];

// Data Skills
export const skillsData: ExtendedSkill[] = [
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
];

// Fungsi Pembantu
export const getLevelColor = (level: Skill["level"]): string => {
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

export const getLevelProgress = (level: Skill["level"]): number => {
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
