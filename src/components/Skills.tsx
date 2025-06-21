import type React from "react";
import type { Skill } from "../types/portofolio";

const Skills: React.FC = () => {
  const skills: Skill[] = [
    { name: "JavaScript", level: "Advanced", category: "Frontend" },
    { name: "TypeScript", level: "Intermediate", category: "Frontend" },
    { name: "React", level: "Advanced", category: "Frontend" },
    { name: "Next.js", level: "Intermediate", category: "Frontend" },
    { name: "Tailwind CSS", level: "Advanced", category: "Frontend" },
    { name: "Node.js", level: "Intermediate", category: "Backend" },
    { name: "Python", level: "Intermediate", category: "Backend" },
    { name: "MongoDB", level: "Intermediate", category: "Database" },
    { name: "PostgreSQL", level: "Beginner", category: "Database" },
    { name: "Git", level: "Advanced", category: "Tools" },
    { name: "VS Code", level: "Advanced", category: "Tools" },
    { name: "Figma", level: "Intermediate", category: "Tools" },
  ];

  const categories = ["Frontend", "Backend", "Database", "Tools"] as const;

  const getLevelColor = (level: Skill["level"]): string => {
    switch (level) {
      case "Beginner":
        return "bg-yellow-500 dark:bg-yellow-400";
      case "Intermediate":
        return "bg-blue-500 dark:bg-blue-400";
      case "Advanced":
        return "bg-green-500 dark:bg-green-400";
      default:
        return "bg-gray-500 dark:bg-gray-400";
    }
  };

  return (
    <section
      id="skills"
      className="py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Skills & Technologies
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                {category}
              </h3>
              <div className="space-y-3">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs text-white font-medium ${getLevelColor(
                          skill.level
                        )}`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
