import type React from "react";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-28 px-4 bg-muted/30 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">
              My Journey
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {
                "I'm currently pursuing my Bachelor's degree in Information Technology, with a passion for web development and software engineering. My journey in tech started with curiosity about how websites work, and it has evolved into a deep love for creating digital solutions."
              }
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {
                "I enjoy working with modern technologies like React, Next.js, and Node.js, and I'm always eager to learn new frameworks and tools that can help me build better applications."
              }
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {
                "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or working on personal projects that challenge my skills."
              }
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-300 animate-float">
              <h4 className="text-lg font-semibold mb-2 text-card-foreground">
                Education
              </h4>
              <p className="text-muted-foreground">
                Bachelor of Information Technology
                <br />
                <span className="text-blue-600 font-medium">
                  Your University
                </span>
                <br />
                <span className="text-sm">Expected Graduation: 2025</span>
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-300 animate-float delay-100">
              <h4 className="text-lg font-semibold mb-3 text-card-foreground">
                Interests
              </h4>
              <ul className="text-muted-foreground space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse"></span>
                  Full-Stack Web Development
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse delay-75"></span>
                  Mobile App Development
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse delay-150"></span>
                  Cloud Computing
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 animate-pulse delay-200"></span>
                  Open Source Contribution
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
