"use client"; // Diubah menjadi Client Component untuk Framer Motion

import type React from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SkillsInteractive from "./components/SkillsInteractive";
import { skillsData } from "./data";
import {
  Zap,
  Trophy,
  TrendingUp,
  Target,
  Award,
  Rocket,
  BookOpen,
  Code2,
  Users,
} from "lucide-react";

// Komponen helper untuk animasi scroll-into-view
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

const Skills: React.FC = () => {
  const advancedSkillsCount = skillsData.filter(
    (skill) => skill.level === "Advanced"
  ).length;
  const learningCount = skillsData.filter((skill) => skill.learning).length;
  const totalProjects = skillsData.reduce(
    (total, skill) => total + skill.projects,
    0
  );
  const certificationCount = skillsData.filter(
    (skill) => skill.certification
  ).length;

  return (
    <section id="skills" className="py-24 px-4 bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 dark:from-blue-950/10 dark:to-purple-950/10"></div>
      <div className="max-w-7xl mx-auto relative">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full border border-primary/50 mb-6 font-medium shadow-lg">
            <Zap className="w-4 h-4" />
            <span className="text-sm">Technical Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Skills &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive overview of my technical skills, tools, and
            technologies I work with to create amazing digital experiences
          </p>
        </AnimatedSection>

        <SkillsInteractive />

        <AnimatedSection className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Kartu-kartu summary sekarang akan muncul dengan animasi */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-card p-8 rounded-2xl border-2 border-border hover:border-yellow-300 dark:hover:border-yellow-600 shadow-lg group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">
                Advanced Skills
              </span>
            </div>
            <p className="text-4xl font-bold text-foreground">
              {advancedSkillsCount}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-card p-8 rounded-2xl border-2 border-border hover:border-green-300 dark:hover:border-green-600 shadow-lg group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">
                Currently Learning
              </span>
            </div>
            <p className="text-4xl font-bold text-foreground">
              {learningCount}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-card p-8 rounded-2xl border-2 border-border hover:border-purple-300 dark:hover:border-purple-600 shadow-lg group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">
                Total Projects
              </span>
            </div>
            <p className="text-4xl font-bold text-foreground">
              {totalProjects}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-card p-8 rounded-2xl border-2 border-border hover:border-orange-300 dark:hover:border-orange-600 shadow-lg group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">
                Certifications
              </span>
            </div>
            <p className="text-4xl font-bold text-foreground">
              {certificationCount}
            </p>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="bg-card p-10 rounded-2xl border-2 border-border shadow-lg">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full border border-purple-700 mb-6 font-medium shadow-lg">
              <Rocket className="w-4 h-4" />
              <span className="text-sm">Continuous Learning</span>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">
              My Learning Philosophy
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Technology evolves rapidly, and I believe in continuous learning
              to stay current with the latest trends and best practices in
              software development.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Learn</h4>
              <p className="text-muted-foreground">
                Constantly exploring new technologies and frameworks
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Code2 className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">
                Practice
              </h4>
              <p className="text-muted-foreground">
                Building projects to apply and reinforce new skills
              </p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">Share</h4>
              <p className="text-muted-foreground">
                Contributing to the community and helping others learn
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Skills;
