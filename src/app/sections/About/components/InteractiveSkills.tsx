"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { interactiveSkills } from "../data";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const InteractiveSkills: React.FC = () => {
  return (
    <div>
      <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
        Skills & Expertise
      </h3>
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {interactiveSkills.map((skill) => {
          const IconComponent = skill.icon;
          return (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="group bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/20 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-3 bg-gradient-to-r ${skill.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {skill.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                </div>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full origin-left transition-transform duration-500 ease-out group-hover:scale-x-105`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default InteractiveSkills;
